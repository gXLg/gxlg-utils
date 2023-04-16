class TimePromise extends Promise {

  constructor(callback, timeout){

    const status = {
      "resolved": false,
      "pending": true,
      "rejected": false,
      "timedout": false
    };

    let res, rej, t;

    if(timeout !== undefined){
      t = setTimeout(() => {
        if(!this.status.pending) return;
        this.status.timedout = true;
        this.status.pending = false;
        this.resolve(null);
      }, timeout);
    }

    super((resolve, reject) => {
      res = (...a) => {
        clearTimeout(t);
        status.pending = false;
        status.resolved = true;
        resolve(...a);
      };
      rej = (...a) => {
        clearTimeout(t);
        status.pending = false;
        status.rejected = true;
        reject(...a);
      };
      return callback(res, rej, status);
    });
    this.resolve = res;
    this.reject = rej;
    this.status = status;
    this.timeout = t;
  }
}

module.exports = TimePromise;
