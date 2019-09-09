const Random = require('jrandom');
// const File   = require('./File');
// const Events = require('./events');


class Tools extends (Random){
    static updateOBJ(self, sourc){
        if(typeof self === "object" && typeof sourc === "object"){
            var Skeys = Object.keys(sourc);
            Skeys.forEach((key)=>{
                if((typeof self[key] !== "object" && typeof sourc[key] === "object") || (typeof self[key] === "object" && typeof sourc[key] !== "object")){
                    self[key] = sourc[key];
                }else if(typeof self[key] === "object" && typeof sourc[key] === "object"){
                    if(self[key] !== sourc[key]){
                        Tools.updateOBJ(self[key], sourc[key]);
                    }
                }else if(self[key] !== sourc[key]){
                    self[key] = sourc[key]
                }
            }) 
        }
        return self
    }
    static isFun(v){
        return Object.prototype.toString.call(v) === "[object Function]";
    };
    static isArr(v){
        return Object.prototype.toString.call(v) === "[object Array]";
    };
    static isObj(v){
        return Object.prototype.toString.call(v) === "[object Object]";
    };
    static isStr(v){
        return Object.prototype.toString.call(v) === "[object String]";
    };
    static isNum(v){
        return Object.prototype.toString.call(v) === "[object Number]";
    };
    static isBoo(v){
        return Object.prototype.toString.call(v) === "[object Boolean]";
    };
    static isUnd(v){
        return Object.prototype.toString.call(v) === "[object Undefined]"
    };
    static isNul(v){
        return Object.prototype.toString.call(v) === "[object Null]"
    };
    static isEmp(v){
        if(Tools.isObj(v)) return Object.keys(v).length === 0;
        return v.length === 0;
    }
    static isDEmp(v){
        if(Tools.isEmp(v))return false;
        if(Tools.isArr(v))
            for(var i of v)
                // console.log(i)
                if(Tools.isEmp.isNot(i))return false;
        return true;
    }
    static is(target,conditions){
        var that = conditions.this || null,
            args;
        if(conditions.args){
            if(!Tools.isArr(conditions.args)){
                args = [conditions.args];
            };
        };
        for(i=2;i<arguments.length;i++){
            args.push(arguments[i]);
        };
        var cond = Object.prototype.toString.call(target).replace(/(\[|\])/g,"").split(" ")[1].toLowerCase();
        if(conditions.hasOwnProperty(cond)){
            if(Tools.isFun(conditions[cond])){
                conditions[cond].apply(that,args);
            };
        };
    };
}


Tools.isFun.__proto__ = {isNot};
Tools.isArr.__proto__ = {isNot};
Tools.isObj.__proto__ = {isNot};
Tools.isStr.__proto__ = {isNot};
Tools.isNum.__proto__ = {isNot};
Tools.isBoo.__proto__ = {isNot};
Tools.isUnd.__proto__ = {isNot};
Tools.isNul.__proto__ = {isNot};
Tools.isEmp.__proto__ = {isNot};
Tools.isDEmp.__proto__ = {isNot};

function isNot(v){
    return !this(v);
};

module.exports = Tools;
// export default Tools