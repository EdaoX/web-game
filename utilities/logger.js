export const DEBUG   = { label : 'DEBUG',   color : '\x1b[1;37m'};
export const INFO    = { label : 'INFO',    color : '\x1b[1;36m'};
export const WARNING = { label : 'WARNING', color : '\x1b[1;33m'};
export const ERROR   = { label : 'ERROR',   color : '\x1b[1;31m'};

const Log = (level, message) => {
    const date = new Date();
    const { label, color } = level;
    console.log(`${color}%s\x1b[0m`,`[${label}] ${date.toLocaleString('en-US')}: ${message}`);
};

Log.d = (message) => Log(DEBUG, message);
Log.i = (message) => Log(INFO, message);
Log.w = (message) => Log(WARNING, message);
Log.e = (message) => Log(ERROR, message);

export default Log;
