import diversos from './diversos'

export default obj => {
    return {
        hasKey: (key) => {
            return obj ? {}.hasOwnProperty.call(obj, key) : false
        },
        getKeyByValue: (value) => {
            return Object.keys(obj).find(key => obj[key] == value)
        },
        hasOwnProperty: (propertyPathDoted) => {
            if (!propertyPathDoted)
                return false;

            var properties = propertyPathDoted.split('.');

            for (var i = 0; i < properties.length; i++) {
                var prop = properties[i];

                if (!obj || !obj.hasOwnProperty(prop)) {
                    return false;
                } else {
                    obj = obj[prop];
                }
            }
            return true;
        },
        get: (dot_path, _default) => {
            var arr = dot_path.split(".");
            while(arr.length && (obj = obj[arr.shift()]));
            return obj || _default;
        },
        toHtmlList: (config) => {
            if(!obj || typeof obj == 'string'){
                return obj;
            }

            let eObject = diversos.typeof(obj, 'object');

            let root_atributtes = Object.assign({style: "text-align: left"}, config ? config.root : {} );
            let divs_atributtes = Object.assign({style: "font-weight: bold;"}, config ? config.divs : {} );
            let ul_atributtes = Object.assign({style: "font-weight: normal; "}, config ? config.ul : {} );
            let li_atributtes = eObject ? Object.assign({style: "list-style-type: disc; list-style-position: inside;"}, config ? config.li : {} ) : Object.assign({style: "font-weight: bold;"}, config ? config.li : {} ) ;

            let root_config = "";
            let divs_config = "";
            let ul_config = "";
            let li_config = "";
            
            if(root_atributtes){
                for (const attr_name in root_atributtes) {
                    const attr = root_atributtes[attr_name];
                    root_config += `${attr_name}="${attr}" `
                }
            }

            if(divs_atributtes){
                for (const attr_name in divs_atributtes) {
                    const attr = divs_atributtes[attr_name];
                    divs_config += `${attr_name}="${attr}" `
                }
            }

            if(ul_atributtes){
                for (const attr_name in ul_atributtes) {
                    const attr = ul_atributtes[attr_name];
                    ul_config += `${attr_name}="${attr}" `
                }
            }

            if(li_atributtes){
                for (const attr_name in li_atributtes) {
                    const attr = li_atributtes[attr_name];
                    li_config += `${attr_name}="${attr}" `
                }
            }

            let html = `<div ${root_config}>`;
            for (const key in obj) {
                if(eObject){
                    html += `<div ${divs_config}>${key}`
                } 
                const item = obj[key];
                html += `<ul  ${ul_config}>
                            <li  ${li_config}> ${item} </li>
                        </ul>`
                if(eObject){
                    html += `</div>`
                }
            }
            html += `</div>`;
            return html;
        },
        
    }
}
