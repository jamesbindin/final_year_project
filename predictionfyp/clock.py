from apscheduler.schedulers.blocking import BlockingScheduler
import os
import importlib
import gpflow_regression_all

sched = BlockingScheduler()
#Run gpr script
def timed_job():
    importlib.reload(gpflow_regression_all)

if __name__ == '__main__':
    scheduler = BlockingScheduler()
    scheduler.add_job(timed_job, 'interval', minutes=120)
    print('Press Ctrl+{0} to exit'.format('Break' if os.name == 'nt' else 'C'))

    try:
        scheduler.start()
    except (KeyboardInterrupt, SystemExit):
        pass
