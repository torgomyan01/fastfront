console.time();
// CREATING STYLE TAGS
const colorsHead = document.createElement('STYLE');
const medias = document.createElement('STYLE');
medias.id = 'media';
const style = document.createElement('STYLE');
style.id = 'styles';
const hovers = document.createElement('STYLE');
hovers.id = 'hovers';


const colors = {
    white: '#FFFFFF',
    black: '#181E34',
    grey: '#DFDFDF',
    pinkGray: '#F0F1FF',
    blue: '#3089FF'
}


const colour =  (colour, value) => {
    const opacity = Math.floor(0.1 * value * 255).toString(16);
    return colour + opacity;
};


Object.keys(colors).forEach((key) => {
    const color = colors[key];
    Array.from({length: 10}).reverse().map((i, index) => 10 - index).forEach((item, index) => {
        if(index){
            const count = index * 100;
            const newCey =  `${key}-${count}`;
            colorsHead.innerHTML = `${colorsHead.innerHTML} .c-${newCey} {color: ${colour(color, index)}}`;
            colorsHead.innerHTML = `${colorsHead.innerHTML} .bgc-${newCey} {background-color: ${colour(color, index)}}`;
        }
    })
})


const randomText = () => (Math.random() + 1).toString(36).substring(7).replace(/[0-9]/g, '');

// FOR COMPONENTS
const costs = {
    bgBlur: 'bgBlur-',
    color: 'c-',
    bgc: 'bgc-',
    fw: 'fw-',
    zIndex: 'z-',
    opacity: 'op-',
    borderColor: 'bc-',
    flexGap: 'gap-',
    colPercent: 'colPercent-',
    transition: 'trans-',
}
const allElem = document.querySelectorAll('*');
const head = document.head;

const mediaSizes = {
    'sm': 576,
    'md': 768,
    'lg': 992,
    'xl': 1200,
    'xxl': 1400
};

const sizes = [
    {sizeName: 'sm', size: mediaSizes['sm']},
    {sizeName: 'md', size: mediaSizes['md']},
    {sizeName: 'lg', size: mediaSizes['lg']},
    {sizeName: 'xl', size: mediaSizes['xl']},
    {sizeName: 'xxl', size: mediaSizes['xxl']}
];

const classTypes = [
    {minClass: 'fw-', styleName: 'font-weight'},
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
    {minClass: costs.borderColor, styleName: 'border-color'},
    {minClass: costs.opacity, styleName: 'opacity'},
    {minClass: costs.zIndex, styleName: 'z-index'},
    {minClass: costs.bgBlur, styleName: 'backdrop-filter'},
    {minClass: costs.bgc, styleName: 'background-color'},
    {minClass: costs.color, styleName: 'color'},
    {minClass: costs.flexGap, styleName: 'gap'},
    {minClass: costs.colPercent, styleName: 'width'},
    {minClass: costs.transition, styleName: 'transition'},
]

const oldClasses = [];

if (typeof colors === 'undefined') {
    const script = document.createElement('script');
    script.innerHTML = `const colors = {}`;
    document.head.appendChild(script)
}

const flexMappings = {
    'sb': 'justify-content: space-between;',
    's': 'align-items: start;',
    'c': 'align-items: center;',
    'se': 'justify-content: space-evenly;',
    'sa': 'justify-content: space-around;',
    'fs': 'align-items: flex-start;',
    'fe': 'align-items: flex-end;',
    'jc': 'justify-content: center;',
    'jfs': 'justify-content: flex-start;',
    'jfe': 'justify-content: flex-end;',
    'as': 'align-items: stretch;',
    'ae': 'align-items: end;'
};

const oldFlexClass = [];

const flexElement = document.querySelectorAll('[class*="flex-"]');

class ConvertFlex {

    static String(flexString) {
        if (!flexString.startsWith('flex-')) {
            return 'Invalid flex shorthand';
        }

        const styles = flexString.slice(5).split('-');

        let result = 'display: flex;';

        styles.forEach(style => {
            if (flexMappings[style]) {
                result += `  ${flexMappings[style]}`;
            } else {
                result += `  /* Unknown shorthand: ${style} */\n`;
            }
        });

        return result;
    }

    static StringWithMedia(flexString) {
        let mediaQuery = '';
        let result = '';

        const mediaKey = flexString.match(/^(flex-(sm|md|lg|xl|xxl)-)/);
        if (mediaKey) {
            const size = mediaKey[2];
            mediaQuery = `@media (min-width: ${mediaSizes[size]}px) {\n .${flexString} {\n`;
            flexString = flexString.replace(mediaKey[1], 'flex-'); // Հեռացնել մեդիա մասը
        }

        if (!flexString.startsWith('flex-')) {
            return 'Invalid flex shorthand';
        }

        const styles = flexString.slice(5).split('-');

        result += 'display: flex;\n';

        styles.forEach(style => {
            if (flexMappings[style]) {
                result += `  ${flexMappings[style]}\n`;
            } else {
                result += `  /* Unknown shorthand: ${style} */\n`;
            }
        });

        if (mediaQuery) {
            result = `${mediaQuery}  ${result.replace(/\n/g, '\n  ')}\n}\n}`;
        }

        return result;
    }
}


allElem.forEach((item) => {
    item.classList.forEach((className) => {
        startConvertingClasses(className, item)
    })
    if (String(item.className).includes('!') || String(item.className).includes('%')) {
        item.className = item.className.replace(/[!,%]/g, '')
    }
})


function startConvertingClasses(className, item){

    if(className.includes('hover')){
        const startIndex = className.indexOf('child:')
        const endIndex = className.indexOf(']]');

        const childValue = className.slice(startIndex, endIndex + 1);
        const hoverName = className.replace(childValue + ']', '').replace(/hover:/g, '').replace(/[\]\[]/g, '').split(',');
        const newHoverClassName = `${randomText()}_fastfront_${randomText()}`;
        startChildHover(className, item)

        let hoverStyle = `.${newHoverClassName}:hover{`

        if(hoverName){
            hoverName.forEach((className) => {

                if(className.includes('flex-')){
                    const flex = ConvertFlex.String(className);
                    hoverStyle += flex;
                    return;
                }

                if(!className.includes('child:')){
                    const colorLength = className.split('-');
                    const {checkInp, percent} = {
                        checkInp: className.includes('!') ? '!important' : '',
                        percent: className.includes('%') ? '%' : 'rem',
                    }


                    if(colorLength.length === 3 && (className.includes('c-')  || className.includes('bgc-'))){
                        hoverStyle += `
                        ${checkType(colorLength[0] + '-')}: ${colour(colors[colorLength[1]], +colorLength[2] / 100)} ;
                    `
                    } else {
                        const typeHover = classTypes.find((classType) => `${className.split('-')[0]}-`.includes(classType.minClass));

                        if(typeHover){
                            hoverStyle += `${typeHover.styleName}: ${printStyle(typeHover, className, percent, checkInp, className.split('-')[1])};`
                        }
                    }
                }

            })
        }

        hoverStyle += '}';
        hovers.innerHTML = `${hovers.innerHTML} ${hoverStyle}`;
        item.classList.add(newHoverClassName)
        item.classList.remove(className)

    }


    const checkingImportant = chekWork(className);

    const type = classTypes.find((classType) => !className.indexOf(checkingImportant + classType.minClass) && !oldClasses.includes(className));

    if (type && !className.includes('hover:')) {
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

}


function startChildHover(className, item){
    const classArray = className.replace(/hover:/g, '');
    const startIndex = classArray.indexOf('child:')
    const endIndex = classArray.indexOf(']]');
    const checkingImportant = chekWork(classArray);

    const childValue = classArray.slice(startIndex, endIndex + 1).replace('child:[', '').split('|');

    if(childValue.length){
        const newHoverClassName = `${randomText()}_fastfront_${randomText()}`;

        childValue.forEach((classValue) => {
            const splitSelectorValue = classValue.split(':');
            const getValues = splitSelectorValue[1]?.replace('[', '').replace(']', '');

            if(getValues){
                let hoverStyle = `.${newHoverClassName}:hover ${splitSelectorValue[0]} { \n`
                const convertClass = getValues.split(',');

                if(convertClass.length){
                    convertClass.map((_className) => {
                        const type = classTypes.find((classType) => _className.includes(classType.minClass));

                        if (type) {
                            const {checkInp, percent, newClassNem} = {
                                checkInp: _className.includes('!') ? '!important' : '',
                                percent: _className.includes('%') ? '%' : 'rem',
                                newClassNem: _className.replace(/[!,%]/g, '')
                            }
                            const classCount = newClassNem.split('-')[1];
                            const colorLength = _className.split('-');

                            if(colorLength.length === 3 && (_className.includes('c-') || _className.includes('bgc-'))){
                                hoverStyle += `${type.styleName}: ${colour(colors[colorLength[1]], +colorLength[2] / 100)};\n`;
                            } else {
                                hoverStyle += `${type.styleName}: ${printStyle(type, _className, percent, checkInp, classCount)};\n`;
                            }
                        }
                    })

                    hoverStyle += '}';
                    hovers.innerHTML = `${hovers.innerHTML} ${hoverStyle}`;
                    item.classList.add(newHoverClassName);
                }


                // console.log(convertClass)
            }
        })
    }
}

function checkType(type){
    switch (type){
        case costs.color:
            return 'color';
        case costs.bgc:
            return 'background-color'
    }
}


function startCreateStyle(classCountTwo, type, newClassNem, percent, checkInp, classCount, className) {
    if (classCountTwo) {
        sizes.forEach((_size) => {
            const mediaClassName = `${type.minClass}${_size.sizeName}`;
            if (newClassNem.includes(mediaClassName) && !oldClasses.includes(newClassNem)) {
                oldClasses.push(newClassNem);
                medias.innerHTML = `${medias.innerHTML} @media (min-width: ${_size.size}px){.${newClassNem}{${type.styleName}: ${printStyle(type, className, percent, checkInp, classCountTwo)}}}`;
            }
        })

        if(!!+classCount){
            oldClasses.push(newClassNem);
            medias.innerHTML = `${medias.innerHTML} @media (min-width: ${classCount}px){.${newClassNem}{${type.styleName}: ${printStyle(type, className, percent, checkInp, classCountTwo)}}}`;
        }
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
        case costs.transition:
            return `${classCount}ms`;
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
            return `blur(${percentOrRem}) ${checkInp}`;
        case costs.zIndex:
            return `${classCount} ${checkInp}`;
        case costs.opacity:
            return `${+classCount / 10} ${checkInp}`;
        case costs.colPercent:
            return `${classCount}%  ${checkInp}`;
        default:
            return `${percentOrRem}  ${checkInp}`;
    }
}


function chekWork(className) {
    return className.includes('!') ? '!important' : className.includes('%') ? '%' : '';
}


// FLEX FUNCTIONS



flexElement.forEach((flexElem) => {
    const classList = [...flexElem.classList].filter((c) => c.includes('flex-'));
    classList.forEach((className) => {
        startWorkingFlex(className)
    })
})

function startWorkingFlex(className){
    const checkFlex = oldFlexClass.some((oldClass) => oldClass === className);
    if(!checkFlex){
        const mediaKey = className.match(/^(flex-(sm|md|lg|xl|xxl)-)/);
        if(mediaKey){
            medias.innerHTML = `${medias.innerHTML} ${ConvertFlex.StringWithMedia(className)}`;
        } else {
            let css = `.${className}{${ConvertFlex.String(className)}}`;
            style.innerHTML = `${style.innerHTML} ${css}`;
        }
        oldFlexClass.push(className);
    }
}

const targetElement = document.body;

// Callback ֆունկցիա՝ փոփոխությունների համար
const callback = (mutationsList) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            const changedElement = mutation.target;

            const classList = changedElement.className.split(/\s+/);
            const oldClassList = mutation.oldValue ? mutation.oldValue.split(/\s+/) : [];

            const addedClasses = classList.filter(cls => !oldClassList.includes(cls));
            const removedClasses = oldClassList.filter(cls => !classList.includes(cls));

            for (const addedClass of addedClasses) {
                if(addedClass.includes('flex-')){
                    startWorkingFlex(addedClasses)
                } else {
                    startConvertingClasses(addedClass, addedClasses)
                }
            }
            startAppend();
        }
    }
};


const observer = new MutationObserver(callback);

const config = { attributes: true, attributeFilter: ['class'], subtree: true, attributeOldValue: true };

observer.observe(targetElement, config);


startAppend();

head.appendChild(colorsHead);
function startAppend(){
    head.appendChild(style);
    head.appendChild(medias);
    head.appendChild(hovers);
}

console.timeEnd()