import torch
from PIL import Image
import os
import io
from flask import Flask
import ssl
from flask import Flask,request, redirect,send_file
# import json


ssl._create_default_https_context = ssl._create_unverified_context

app = Flask(__name__)

@app.route("/",methods=['GET','POST'])
def hello_world():
    print(request.method)
    print(request.form)
    if request.method == "POST":
        if "file" not in request.files:
            return redirect(request.url)
        file = request.files["file"]
        if not file:
            return

        img_bytes = file.read()
        img = Image.open(io.BytesIO(img_bytes))
        model = torch.hub.load('ultralytics/yolov5','custom', path='best (1).pt',force_reload=False)
        model.eval()
        results = model([img])
        results.render()  # updates results.imgs with boxes and labels
        img_savename = f"static11.png"
        Image.fromarray(results.ims[0]).save(img_savename)
        jsresult={"result":str(results)}
        return (send_file(img_savename))


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))


