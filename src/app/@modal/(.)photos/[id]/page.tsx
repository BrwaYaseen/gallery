import { Modal } from "./modal";
import ImagePageView from "~/components/full-image-page";

export default function PhotoModal ({
    params: {id: photoId},
}: {
    params: {id: string};
}){
    const idAsNumber = Number(photoId)
    if(Number.isNaN(idAsNumber)) throw new Error("Invalid Photo Id")

    return (
        <Modal>
           <ImagePageView id={idAsNumber}/>
        </Modal>
    )
}