export default function Checkbox ({classname, text, ...rest}){
 return(
    <label className={classname}>
        <input type="checkbox" {...rest} />
        <span> {text}</span>
    </label>
 );
}