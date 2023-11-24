let a = {

  // SpectCOW | TypedObject
  
  TypedObject: class TypedObject {
    constructor(obj) {
      if (!obj) obj = {};

      TypedObject.typeEntries(this, obj);

      return this
    }

    static typeEntries(th, obj) {
      Object.entries(obj).forEach(([key, value]) => {
        th[key] = typeof value;
      });
    }

    static set(th, data) {
      return Object.assign(th, data)
    }
  },

  TypeProxy: class TypeProxy {
    static collection = [];
    static holderSymbol = Symbol.for('meta');
    static coreSymbol = Symbol.for('core');

    static add(data) {
      TypeProxy.collection.push(data);

      if (this[TypeProxy.holderSymbol].length < 1) {
        this[TypeProxy.holderSymbol] = [data];
      } else {
        this[TypeProxy.holderSymbol].push(data);
      }
    }

    // An Object which, once defined, keeps values strictly that type.
    constructor(obj) {
      if (!obj) obj = {};

      this[TypeProxy.coreSymbol] = {};

      this._OBJECT_ = {
        [TypeProxy.coreSymbol]: createTypedObject('TypedStorage', {
          check: (value) => {
            return typeof value === this[TypeProxy.coreSymbol];
          },
          get: (key) => {
            return this[TypeProxy.coreSymbol][key];
          },
          set: (key, value) => {
            // Check Types
            if (this[TypeProxy.coreSymbol][key] && typeof this[TypeProxy.coreSymbol][key] !== typeof value) {
              throw new TypeError(`Expected type ${typeof value} for key ${key} but got ${typeof this[TypeProxy.coreSymbol][key]}`);
            }

            return this[TypeProxy.coreSymbol][key] = value;
          },
        }),
      };

      let o__ = this._OBJECT_.typed = new this._OBJECT_[TypeProxy.coreSymbol](obj);

      return new Proxy(this._OBJECT_.typed, {
        get: (target, key) => {
          if (o__.check(key)) {
            return o__.get(key);
          } else {
            return target[key];
          }
        },
        set: (target, key, value) => {
          if (o__.check(key)) {
            o__.set(key, value);
          } else {
            throw new TypeError(`Expected type ${typeof value} for key ${key} but got ${typeof o__.get(key)}`);
          }
        },
      });
    }
  },

  createTypedObject(name = '', methods) {
    let _t = {
      [name]: class extends TypedObject {
        constructor(obj) {
          super(obj);
          TypedObject.set(this, methods);
        }
      }
    }

    return _t[name]
  }
  
}

module.exports = a;