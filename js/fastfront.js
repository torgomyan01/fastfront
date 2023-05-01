const COSTS = {
    404: 'Please check URL data file'
}

const getComponent = (url, callBack) => {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false );
    xmlHttp.send( null );

    switch (xmlHttp.status){
        case 200:
            callBack(xmlHttp.responseText);
            break;
        case 404:
            callBack(COSTS["404"]);
            break;
    }
}

class dataFor {
    static data = document.querySelectorAll('datafor');

    static startGetData(){
        this.data.forEach((item) => {
            const src = item.getAttribute('src');
            const itemHTML = item.innerHTML;
            let newHTML = '';

            getComponent(src, function (res){
                if(res === COSTS["404"]){
                    console.error(res);
                } else {
                    const json = JSON.parse(res);
                    json.forEach((jsonItem) => {
                        let html = itemHTML;
                        Object.keys(jsonItem).map((keyObj) => {
                            const reg = new RegExp(`{{${keyObj}}}`, 'g');
                            html = html.replace(reg, jsonItem[keyObj]);
                        })
                        newHTML += html;
                    })
                    item.outerHTML = newHTML;
                }
            })
        })
    }
}

dataFor.startGetData()


class forComponent {
    static scrName = '<script>';
    static scrEndName = '</script>';

    static startCovertComponent(){
        const components = document.querySelectorAll('component');
        components.forEach((component, index) => {
            const src = component.getAttribute('src');

            const props = component.getAttribute('props');
            if(props) {
                const propsArray = props.replace(/[{,\n}]/g, '').split(';');
                getComponent(src, (res) => {
                    this.addScript(res, (HTML) => {
                        let ConvertedHtml = HTML;
                        propsArray.map((_props) => {
                            const objProps = _props.split(':');
                            const key = objProps[0].replace(/ /g, '');
                            const val = objProps[1];
                            const reg = new RegExp(`{{${key}}}`, 'g');
                            ConvertedHtml = ConvertedHtml.replace(reg, val === `''` ? `` : val);
                        })
                        component.outerHTML = `<!---- THIS COMPONENT URL ${src} -->${ConvertedHtml}`;
                    });
                })
            } else {
                getComponent(src, (res) => {
                    this.addScript(res, (HTML) => {
                        component.outerHTML = `<!---- THIS COMPONENT URL ${src} -->${HTML}`;
                    });
                })
            }


            if(components.length > 0 && index === components.length - 1){
                this.startCovertComponent();
                this.startConvertFor();
            }
        })
    }

    static addScript(res, calBack){
        if(res.includes(this.scrName)){
            const startIndexOfScript = res.indexOf(this.scrName);
            const endScript = res.indexOf(this.scrEndName);
            const cropString = res.slice(startIndexOfScript + this.scrName.length, endScript);

            const newScript = document.createElement('script');
            newScript.setAttribute('defer', 'true');
            newScript.innerHTML = cropString;
            document.body.appendChild(newScript);

            calBack(res.slice(0, startIndexOfScript));
        } else {
            calBack(res);
        }
    }

    static startConvertFor(){
        const forTag = document.querySelectorAll('for');
        forTag.forEach((item) => {
            let html = item.innerHTML;
            const count = +item.getAttribute('count');
            const data = item.dataset;

            if(count){
                let _html = '';
                for (let i = 0; i < count; i++){
                    let _htm = html;
                    for (let key in data){
                        const keyArr = data[key].split(',');
                        const reg = new RegExp(`{{${key}}}`, 'g');
                        _htm =  _htm.replace(reg, keyArr[i] === `''` ? '' : keyArr[i]);
                    }
                    _html += _htm + '\n';
                }
                item.outerHTML = _html;
            }
        })
    }
}

forComponent.startCovertComponent();
forComponent.startConvertFor();

console.time();
const costs = {
    bgBlur: 'bgBlur-',
    color: 'c-',
    bgc: 'bgc-',
    fw: 'fw-',
    zIndex: 'z-',
}
const allElem = document.querySelectorAll('body *');
const head = document.head;

const sizes = [{sizeName: 'sm', size: 576}, {sizeName: 'md', size: 768}, {sizeName: 'lg', size: 992}, {sizeName: 'xl',size: 1200}, {sizeName: 'xxl', size: 1400}];

const classTypes = [
    {minClass: 'h-', styleName: 'height'},
    {minClass: 'mh-', styleName: 'max-height'},
    {minClass: 'w-', styleName: 'width'},
    {minClass: 'mw-', styleName: 'max-width'},
    {minClass: 'me-', styleName: 'margin-right'},
    {minClass: 'ms-', styleName: 'margin-left'},
    {minClass: 'mt-', styleName: 'margin-top'},
    {minClass: 'mb-', styleName: 'margin-bottom'},
    {minClass: 'm-', styleName: 'margin'},
    {minClass: 'pe-', styleName: 'padding-right'},
    {minClass: 'ps-', styleName: 'padding-left'},
    {minClass: 'pt-', styleName: 'padding-top'},
    {minClass: 'pb-', styleName: 'padding-bottom'},
    {minClass: 'p-', styleName: 'padding'},
    {minClass: 'fs-', styleName: 'font-size'},
    {minClass: 'br-', styleName: 'border-radius'},
    {minClass: 'lh-', styleName: 'line-height'},
    {minClass: 'ls-', styleName: 'letter-spacing'},
    {minClass: 'left-', styleName: 'left'},
    {minClass: 'top-', styleName: 'top'},
    {minClass: 'right-', styleName: 'right'},
    {minClass: 'bottom-', styleName: 'bottom'},
    {minClass: 'fw-', styleName: 'font-weight'},
    {minClass: costs.zIndex, styleName: 'z-index'},
    {minClass: costs.color, styleName: 'color'},
    {minClass: costs.bgc, styleName: 'background-color'},
    {minClass: costs.bgBlur, styleName: 'backdrop-filter'},
]

const oldClasses = [];

// CREATING STYLE TAGS
const style = document.createElement('STYLE');
const medias = document.createElement('STYLE');

allElem.forEach((item) => {
    item.classList.forEach((className) => {
        const checkingImportant = chekWork(className);
        const type = classTypes.find((classType) => !className.indexOf( checkingImportant + classType.minClass) && !oldClasses.includes(className));
        if (type) {
            const { checkInp, percent, newClassNem } = {
                checkInp:  className.includes('!') ? '!important' : '',
                percent: className.includes('%') ? '%' : 'rem',
                newClassNem: className.replace(/[!,%]/g, '')
            }
            const classCount = newClassNem.split('-')[1];
            const classCountTwo = newClassNem.split('-')[2];
            if (classCountTwo) {
                sizes.forEach((_size) => {
                    const mediaClassName = `${type.minClass}${_size.sizeName}`;
                    if (newClassNem.includes(mediaClassName) && !oldClasses.includes(className)) {
                        oldClasses.push(newClassNem);
                        medias.innerHTML = `${medias.innerHTML} @media (min-width: ${_size.size}px){.${newClassNem}{${type.styleName}: ${printStyle(type, className, percent, checkInp, classCountTwo)}}}`;
                    }
                })
            } else {
                if (newClassNem.includes(type.minClass) && !oldClasses.includes(className)) {
                    oldClasses.push(newClassNem);
                    style.innerHTML = `${style.innerHTML} .${newClassNem}{${type.styleName}: ${printStyle(type, className, percent, checkInp, classCount)}}`;
                }
            }
        }
    })
    if(String(item.className).includes('!') || String(item.className).includes('%')){
        item.className = item.className.replace(/[!,%]/g, '')
    }
})



function printStyle(type, className, percent, checkInp, classCount){
    const percentOrRem = `${className.includes('%') ? classCount : classCount / 16}${percent} ${checkInp}`;
    switch (type.minClass){
        case costs.fw:
            return classCount;
        case costs.color:
            const _color = colors[classCount];
            !_color && console.error(`color ${classCount} no added const colors `)
            return _color;
        case costs.bgc:
            const _colorBgc = colors[classCount];
            !_colorBgc && console.error(`background color ${classCount} no added const colors `)
            return _colorBgc;
        case costs.bgBlur:
            return `blur(${percentOrRem})`;
        case costs.zIndex:
            return percentOrRem;
        default:
            return `${percentOrRem}`;
    }
}


function chekWork(className){
    return className.includes('!') ? '!' : className.includes('%') ? '%': '';
}


head.appendChild(style);
head.appendChild(medias);

console.timeEnd()
