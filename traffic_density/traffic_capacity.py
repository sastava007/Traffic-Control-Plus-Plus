import logging
import threading
import logging.handlers
import os
import time
import sys
from flask import Response
from flask import Flask
from flask import render_template
import cv2
import numpy as np
# import skvideo.io
import utils
import matplotlib.pyplot as plt
# without this some strange errors happen
cv2.ocl.setUseOpenCL(False)


app = Flask(__name__)
# ============================================================================

IMAGE_DIR = "./out"
VIDEO_SOURCE = '../short-test.mp4'
SHAPE = (1080, 1920)
AREA_PTS = np.array([[1080, 0], [0, 960], [653, 3], [1080, 1920]])
from pipeline import (
    PipelineRunner,
    CapacityCounter
)
# ============================================================================

context={}
lock=threading.Lock()

def density():



	global context
	log = logging.getLogger("main")
	base = np.zeros(SHAPE + (3,), dtype='uint8')
	area_mask = cv2.fillPoly(base, [AREA_PTS], (255, 255, 255))[:, :, 0]
    
    

    

	pipeline = PipelineRunner(pipeline=[
	    CapacityCounter(area_mask=area_mask, save_image=True, image_dir=IMAGE_DIR)
	    # saving every 10 seconds
	    # ContextCsvWriter('./report.csv', start_time=1505494325, fps=1, faster=10, field_names=['capacity'])
	], log_level=logging.DEBUG)

	# Set up image source
	cap = cv2.VideoCapture(VIDEO_SOURCE)

	frame_number = -1
	st = time.time()
	while True:


	    rc,frame=cap.read()

	    if not frame.any():
	            log.error("Frame capture failed, skipping...")

	    frame_number += 1

	    pipeline.set_context({
	        'frame': frame,
	        'frame_number': frame_number,
	    })
	    context = pipeline.run()
	    # print(context['capacity'])
	    # cv2.imshow("Mask",context['frame'])
	    # skipping 10 seconds
	    # for i in xrange(240):
	    #     cap.next()
	      
	    if cv2.waitKey(33) == 27:
	        break

	cv2.destroyAllWindows()
    
def generate():

	# grab global references to the output frame and lock variables
	
	# loop over frames from the output stream
	global outputFrame, lock

	while True:

		with lock:
		# wait until the lock is acquired
		
			# check if the output frame is available, otherwise skip
			# the iteration of the loop
			outputFrame=context['frame']
			if outputFrame is None:
				continue

			# encode the frame in JPEG format
			(flag, encodedImage) = cv2.imencode(".jpg", outputFrame)

			# ensure the frame was successfully encoded
			if not flag:
				continue

		# yield the output frame in the byte format
		yield(b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + 
			bytearray(encodedImage) + b'\r\n')

@app.route("/video_feed")
def video_feed():
	# return the response generated along with the specific media
	# type (mime type)
	return Response(generate(),
		mimetype = "multipart/x-mixed-replace; boundary=frame")

    
# ============================================================================

if __name__ == "__main__":

	log = utils.init_logging()
	if not os.path.exists(IMAGE_DIR):
		log.debug("Creating image directory `%s`...", IMAGE_DIR)
		os.makedirs(IMAGE_DIR)

	t = threading.Thread(target=density)
	t.daemon = True
	t.start()

	app.run(host='0.0.0.0', port='3000', debug=True,threaded=True, use_reloader=False)





	

   




    
	

        
	
	# start the flask app

    # main()
