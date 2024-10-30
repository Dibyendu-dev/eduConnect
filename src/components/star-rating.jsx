import Image from "next/image";

export function StarRating({rating}) {
    const stars= new Array(rating).fill(0);
    return (
        <>
            {stars.map((_,index)=>(
                <Image src="/assets/star.svg" alt="star" width={20} height={20} key={index}/>
            ))}
        </>
    )
}