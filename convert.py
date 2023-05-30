import onnx
from onnx_tf.backend import prepare

# Load your ONNX model
onnx_model = onnx.load("../model.onnx")

# Convert the ONNX model into a TensorFlow model
tf_rep = prepare(onnx_model)

# Export model to .pb
tf_rep.export_graph('model.pb')
