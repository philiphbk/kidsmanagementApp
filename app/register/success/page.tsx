import Image from "next/image"


export default function Success() {
  return (
    <>
        <div className=" flex flex-col p-24 items-center">
            <Image src="" width={200} height={200} alt="hodlogo" />
            <h1>Image header</h1>
            <p>HOD Kids Pick-Up Platform</p>
            <div className=" flex flex-col items-center border rounded p-4 shadow-xl">
                <div>Image</div>
                <h2>Registration Successful</h2>
                <p>Voila! There you go!</p>
                <br/>
                <hr></hr>
                <br/>
                <p>Thank you for registering your child(ren) with us!</p>
            </div>            
        </div>
    </>

  )
}
