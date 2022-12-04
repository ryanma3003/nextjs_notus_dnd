import React from "react";
import { ItemTypes } from '../../utils/items';
import { useDrag } from 'react-dnd';

const CardItem = (props) => {

	const [{ isDragging }, drag] = useDrag({
		item: {
			id: props.id,
		},
        type: ItemTypes.CARD,
		collect: monitor => ({
			isDragging: !!monitor.isDragging(),
		}),
	});

    return (
        <>
            <div ref={drag} className={"relative flex flex-col min-w-0 break-words rounded mb-6 xl:mb-0 shadow-lg " + (isDragging ? 'bg-emerald-200' : 'bg-teal-200')}>
                <div className="flex-auto p-4">
                    <div className="flex flex-wrap">
                        <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className="text-blueGray-800 font-bold text-xl mb-2">
                                {props.title}
                            </h5>
                            <span className="text-md font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-emerald-400 uppercase last:mr-0 mr-1">
                                <i className="fas fa-coins"></i> {props.point}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CardItem;
