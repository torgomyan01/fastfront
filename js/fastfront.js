console.time();
const colors = {
    white: '#FFFFFF',
    black: '#000',
    textGrey: '#AEB5BC',
    purple: '#833AB4',
    pink: '#C13584',
}


const randomText = () => (Math.random() + 1).toString(36).substring(7);

// FOR COMPONENTS
const costs = {
    bgBlur: 'bgBlur-',
    color: 'c-',
    bgc: 'bgc-',
    fw: 'fw-',
    zIndex: 'z-',
    opacity: 'op-',
    borderColor: 'bc-',
    paddingY: 'py-',
    flexGap: 'gap-',
    colPercent: 'colPercent-',
}
const allElem = document.querySelectorAll('*');
const head = document.head;

const sizes = [
    {sizeName: 'sm', size: 576},
    {sizeName: 'md', size: 768},
    {sizeName: 'lg', size: 992},
    {sizeName: 'xl', size: 1200},
    {sizeName: 'xxl', size: 1400}
];

const classTypes = [
    {minClass: 'h-', styleName: 'height'},
    {minClass: 'mh-', styleName: 'max-height'},
    {minClass: 'minh-', styleName: 'min-height'},
    {minClass: 'w-', styleName: 'width'},
    {minClass: 'mw-', styleName: 'max-width'},
    {minClass: 'minw-', styleName: 'min-width'},
    // MARGIN
    {minClass: 'me-', styleName: 'margin-right'},
    {minClass: 'ms-', styleName: 'margin-left'},
    {minClass: 'mt-', styleName: 'margin-top'},
    {minClass: 'mb-', styleName: 'margin-bottom'},
    {minClass: 'm-', styleName: 'margin'},
    // PADDING
    {minClass: 'pe-', styleName: 'padding-right'},
    {minClass: 'ps-', styleName: 'padding-left'},
    {minClass: 'pt-', styleName: 'padding-top'},
    {minClass: 'pb-', styleName: 'padding-bottom'},
    {minClass: costs.paddingY, styleName: 'padding'},
    {minClass: 'p-', styleName: 'padding'},
    // FONT SIZE
    {minClass: 'fs-', styleName: 'font-size'},
    {minClass: 'br-', styleName: 'border-radius'},
    {minClass: 'roundLeftTop-', styleName: 'border-top-left-radius'},
    {minClass: 'roundLeftBottom-', styleName: 'border-bottom-left-radius'},
    {minClass: 'roundRightBottom-', styleName: 'border-bottom-right-radius'},
    {minClass: 'roundRightTop-', styleName: 'border-top-right-radius'},
    {minClass: 'lh-', styleName: 'line-height'},
    {minClass: 'ls-', styleName: 'letter-spacing'},
    {minClass: 'left-', styleName: 'left'},
    {minClass: 'top-', styleName: 'top'},
    {minClass: 'right-', styleName: 'right'},
    {minClass: 'bottom-', styleName: 'bottom'},
    {minClass: 'fw-', styleName: 'font-weight'},
    {minClass: costs.borderColor, styleName: 'border-color'},
    {minClass: costs.opacity, styleName: 'opacity'},
    {minClass: costs.zIndex, styleName: 'z-index'},
    {minClass: costs.color, styleName: 'color'},
    {minClass: costs.bgc, styleName: 'background-color'},
    {minClass: costs.bgBlur, styleName: 'backdrop-filter'},
    {minClass: costs.flexGap, styleName: 'gap'},
    {minClass: costs.colPercent, styleName: 'width'},
]

const oldClasses = [];

if (typeof colors === 'undefined') {
    const script = document.createElement('script');
    script.innerHTML = `const colors = {}`;
    document.head.appendChild(script)
}

// CREATING STYLE TAGS
const style = document.createElement('STYLE');
const medias = document.createElement('STYLE');
const hovers = document.createElement('STYLE');

allElem.forEach((item) => {
    item.classList.forEach((className) => {

        const checkingImportant = chekWork(className);
        const type = classTypes.find((classType) => !className.indexOf(checkingImportant + classType.minClass) && !oldClasses.includes(className));
        if (type) {
            const {checkInp, percent, newClassNem} = {
                checkInp: className.includes('!') ? '!important' : '',
                percent: className.includes('%') ? '%' : 'rem',
                newClassNem: className.replace(/[!,%]/g, '')
            }
            const classCount = newClassNem.split('-')[1];
            const classCountTwo = newClassNem.split('-')[2];
            if (+classCount > 5 || +classCountTwo > 5) {
                startCreateStyle(classCountTwo, type, newClassNem, percent, checkInp, classCount, className);
            } else if (!+classCount) {
                startCreateStyle(classCountTwo, type, newClassNem, percent, checkInp, classCount, className);
            }
        }

        if(className.includes('hover')){
            const hoverName = className.replace(/hover:/g, '').replace(/[\]\[]/g, '').split(',');
            const newHoverClassName = `${randomText()}_fastfront_${randomText()}`;
            const {checkInp, percent} = {
                checkInp: className.includes('!') ? '!important' : '',
                percent: className.includes('%') ? '%' : 'rem',
            }

            let hoverStyle = `.${newHoverClassName}:hover{`
            if(hoverName){
                hoverName.forEach((className) => {
                    const typeHover = classTypes.find((classType) => classType.minClass === `${className.split('-')[0]}-`);
                    if(typeHover){
                        hoverStyle += `${typeHover.styleName}: ${printStyle(typeHover, className, percent, checkInp, className.split('-')[1])};`
                    }
                })
            }
            hoverStyle += '}';
            hovers.innerHTML = `${hovers.innerHTML} ${hoverStyle}`;
            item.classList.add(newHoverClassName)

        }

    })
    if (String(item.className).includes('!') || String(item.className).includes('%')) {
        item.className = item.className.replace(/[!,%]/g, '')
    }
})


function startCreateStyle(classCountTwo, type, newClassNem, percent, checkInp, classCount, className) {
    if (classCountTwo) {
        sizes.forEach((_size) => {
            const mediaClassName = `${type.minClass}${_size.sizeName}`;
            if (newClassNem.includes(mediaClassName) && !oldClasses.includes(newClassNem)) {
                oldClasses.push(newClassNem);
                medias.innerHTML = `${medias.innerHTML} @media (min-width: ${_size.size}px){.${newClassNem}{${type.styleName}: ${printStyle(type, className, percent, checkInp, classCountTwo)}}}`;
            }
        })
    } else {
        if (newClassNem.includes(type.minClass) && !oldClasses.includes(newClassNem)) {
            oldClasses.push(newClassNem);
            style.innerHTML = `${style.innerHTML} .${newClassNem}{${type.styleName}: ${printStyle(type, className, percent, checkInp, classCount)}}`;
        }
    }
}


function printStyle(type, className, percent, checkInp, classCount) {
    const percentOrRem = `${className.includes('%') ? classCount : classCount / 16}${percent} ${checkInp}`;
    switch (type.minClass) {
        case costs.fw:
            return classCount;
        case costs.color:
            if (colors[classCount]) {
                const _color = colors[classCount];
                !_color && console.error(`color ${classCount} no added const colors `)
                return `${_color} ${checkInp}`;
            }
            return '';
        case costs.bgc:
            if (colors[classCount]) {
                const _colorBgc = colors[classCount];
                !_colorBgc && console.error(`background color ${classCount} no added const colors `)
                return `${_colorBgc} ${checkInp}`;
            }
            return '';
        case costs.borderColor:
            if (colors[classCount]) {
                const _colorBorder = colors[classCount];
                !_colorBorder && console.error(`border color ${classCount} no added const colors `)
                return `${_colorBorder} ${checkInp}`;
            }
            return '';
        case costs.bgBlur:
            return `blur(${percentOrRem})`;
        case costs.paddingY:
            return `${percentOrRem} 0`;
        case costs.zIndex:
            return classCount;
        case costs.opacity:
            return +classCount / 10;
        case costs.colPercent:
            return `${classCount}%`;
        default:
            return `${percentOrRem}`;
    }
}


function chekWork(className) {
    return className.includes('!') ? '!' : className.includes('%') ? '%' : '';
}

head.appendChild(style);
head.appendChild(medias);
head.appendChild(hovers);

console.timeEnd()