import django
django.setup()
from matchmaking_app.tasks import matching
from matchmaking_app.tasks import calculate
import threading
class AsyncTask:
    def init(self):
        pass
    def MatchingTask(self):
        matching()
        threading.Timer(3, self.MatchingTask).start()
    def MatchingScoreCalculateTask(self):
        calculate()
        threading.Timer(5, self.MatchingScoreCalculateTask).start()


def startup():
    at = AsyncTask()
    at.MatchingTask()
    at.MatchingScoreCalculateTask()
    pass

startup()