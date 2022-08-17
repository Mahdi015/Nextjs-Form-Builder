import React from 'react';
import {useDroppable} from '@dnd-kit/core';

type Props = {
    children: JSX.Element;
    id:any
  };

export function Droppable({children,id}:Props) {
  const {isOver, setNodeRef} = useDroppable({
    id: id,
  });
  const style = { 
    opacity: isOver ? 1 : 0.5,
  };

  return (
    <div ref={setNodeRef} >
      {children}
    </div>
  )}