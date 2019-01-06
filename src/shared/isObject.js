const isAnObject = (obj) => {
    if( obj == null ) return false;
    return obj.constructor.name.toLowerCase() === "object";
}

export default isAnObject;