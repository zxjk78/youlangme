import django
django.setup()
from matchmaking_app.tasks import matching
import threading
class AsyncTask:
    def init(self):
        pass
    def TaskA(self):
        matching()
        threading.Timer(1,self.TaskB).start()
    def TaskB(self):
        threading.Timer(2,self.TaskA).start()



def startup():
    at = AsyncTask()
    at.TaskB()
    # matching(repeat=3)
    pass

startup()