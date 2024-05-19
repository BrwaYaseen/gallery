import ImagePageViewModal from "~/common/full-image-page-modal";
import { Modal } from "./modal";

export default function PhotoModal ({
    params: {id: photoId},
}: {
    params: {id: string};
}){
    const idAsNumber = Number(photoId)
    if(Number.isNaN(idAsNumber)) throw new Error("Invalid Photo Id")

    return (
        <Modal>
           <ImagePageViewModal id={idAsNumber}/>
        </Modal>
    )
}