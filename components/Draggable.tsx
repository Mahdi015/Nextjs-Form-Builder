import React from 'react';
import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';

type Props = {
    children: JSX.Element;
    id:any
  };

export function Draggable({id,children}:Props) {
  const {attributes, listeners, setNodeRef, transform,transition,setActivatorNodeRef} = useSortable({
    id: id,
  });
  const style = {
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Translate.toString(transform),
    transition
  };

  return (
    <div className='relative' ref={setNodeRef} style={style} {...attributes}>
      <span className='absolute top-0  z-40 w-full h-full cursor-move' {...listeners} ref={setActivatorNodeRef} ></span>
      {children}
  </div>
  );
}