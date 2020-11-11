export default {
  copiar: (value) => {
    return JSON.parse(JSON.stringify(value))
  },
  typeof: (value, eTipo) => {
    let tipo = typeof value;
    

    if (value === null) {
      tipo = "null";
    } else if (value === undefined) {
      tipo = "undefined";
    } else if (value === true || value === false) {
      tipo = "boolean";
    } else if (tipo == "object" && Array.isArray(value)) {
      tipo = "array";
    }

    if (eTipo) {
      return eTipo === tipo;
    }

    return tipo;
  },
  bloquearSeIE11() {
    // This if block is for IE 11
    if (!Object.entries)
      Object.entries = function(obj) {
        var ownProps = Object.keys(obj),
          i = ownProps.length,
          resArray = new Array(i); // preallocate the Array
        while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];

        return resArray;
      };
  }

}
