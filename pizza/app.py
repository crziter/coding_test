import datetime
import _thread
import time

from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import zmq

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

# ==== DAO ====
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite"
db = SQLAlchemy(app)

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    flavor = db.Column(db.String(120), nullable=False)
    status = db.Column(db.String(120), nullable=False, default="new")
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def __repr__(self):
        return f"<Order { self.id } flavor: { self.flavor }>"


db.create_all()


def create_new_order(flavor: str) -> int:
    order = Order(flavor=flavor)
    db.session.add(order)
    db.session.commit()
    return order.id


def update_order_status(order_id: int, status: str):
    db.session.query(Order).filter_by(id=order_id).update({ "status": status })
    db.session.commit()


# ==== Queue ====
context = zmq.Context()
zmq_server = context.socket(zmq.PUSH)
zmq_server.bind("tcp://127.0.0.1:5595")

def push_order_to_queue(order_id: int):
    zmq_server.send_json({
        "order_id": order_id
    })


# === API ====
@app.route("/api/new_order", methods=[ "POST" ])
def new_order():
    order = request.json

    order_id = create_new_order(order["options"]["flavor"])
    push_order_to_queue(order_id)

    return {
        "status": "ok"
    }


# === Drivers ===
def driver(name: str):
    consumer_receiver = context.socket(zmq.PULL)
    consumer_receiver.connect("tcp://127.0.0.1:5595")

    while True:
        work = consumer_receiver.recv_json()
        order_id = work["order_id"]
        update_order_status(order_id, "delivered")

        # Simulate busy work
        time.sleep(3)


_thread.start_new_thread(driver, ("Driver 1",))
_thread.start_new_thread(driver, ("Driver 2",))
_thread.start_new_thread(driver, ("Driver 3",))


if __name__ == "__main__":
    app.run()