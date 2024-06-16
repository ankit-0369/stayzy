
import { Link } from "react-router-dom"

interface ButtonProps{
    label: string,
    classname?: string,
    href?:string,
    onclick?:React.MouseEventHandler<HTMLButtonElement>,
    type?: "submit" | "reset" | "button",
    disabled?: boolean,
    style?: React.CSSProperties;

}

export const Button:React.FC<ButtonProps> = ({
    label,
     href,
    classname= "",
    onclick,
    type= "button",
    disabled= false,
    style= {}
    })=>{

    return (
        <span className="flex space-x-2">
            {
                href ? (
                    <Link
                    to={href}
                    className={`flex py-1 rounded-lg bg-[#191919] transition-all duration-300 border-zinc-800 border text-white items-center px-3 font-bold hover:bg-neutral-800 ${classname}`}
                    style={style}
                    >
                    {label}
                    </Link>
                ): (
                    <button
                    onClick={onclick}
                    className={`flex py-1 rounded-lg bg-[#191919] transition-all duration-300 border-zinc-800 border text-white items-center px-3 font-bold hover:bg-neutral-800 ${classname}`}
                    disabled= {disabled}
                    type={type}
                    style={style}
                    >
                        {label}
                    </button>
                )
            }
        </span>
    )
}