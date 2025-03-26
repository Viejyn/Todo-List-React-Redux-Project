import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { Fragment, useState } from 'react';
import modals from "../modals";
import { modalClose } from '../utils';
import { closeModal } from '../store/modal';

export default function Modal({ name, data }) {

    const currentModal = modals.find(m => m.name === name)
    const [isOpen, setIsOpen] = useState(true)
    const close = () => {
        setIsOpen(false)
        setTimeout(modalClose, 200)
    }

    return(
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10 focus:outline-none" onClose={close}>
             <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <TransitionChild
                  as={Fragment}
                  enter='ease-out duration-300'
                  enterFrom='opacity-0 scale-95'
                  enterTo='opacity-100 scale-100'
                  leave='ease-in duration-200'
                  leaveFrom='opacity-100 scale-100'
                  leaveTo='opacity-0 scale-95'
                >
                    <DialogPanel
                      transition
                      className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                    >
                        <currentModal.element close={closeModal} data={data} />
                    </DialogPanel>
                </TransitionChild>            
              </div>
             </div>
            </Dialog>
        </Transition>       
    );
}