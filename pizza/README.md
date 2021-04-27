# Note:
For easier to track the code, I write the code to 1 file `app.py` but separated into 4 sections:
- `DAO` Database related stuffs
- `Queue` Zmq related stuffs
- `API` Flask related stuffs
- `Drivers` Driver simulation

```

Frontend ---[ new order ]---> Backend
                                 |
                                 |
                                 |
                                 |
           Driver 1  <------|    v
           Driver 2  <------|-- Queue
           Driver 3  <------|
```


# Requirements:
- Python 3.8

# To run the app:
```
cd pizza
python -m venv venv
source ./venv/bin/activate
pip install -r requirements.txt

python app.py
```