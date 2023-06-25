import CustomerForm from '@/components/FormSegment/CustomerForm';
import Layout from '@/components/Layout/Layout';
import Modal from '@/components/Module/Modal';
import React, {useState} from 'react';

const Customers = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <Layout>
            <div><header className="-mt-6 -mx-8 bg-white shadow-sm">
        <div className=" mx-auto py-4 px-4 sm:px-6 lg:px-8  flex flex-col md:flex-row space-y-2 md:space-y-0 justify-between items-center">
          <div className={"ml-4 "}>
            <h1 className="text-lg leading-6 font-semibold text-gray-900">
              All Customers Lists
            </h1>
          </div>
          <div className={"ml-4  flex-shrink-0"}>
            <button
              onClick={() => setIsOpen(true)}
              type="button"
              className="inline-flex items-center px-3 py-2.5 border border-transparent text-sm leading-4 font-medium rounded text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
            >
              Add New
            </button>
          </div>
        </div>
      </header>
            <Modal isOpen={isOpen} showXButton onClose={() => setIsOpen(false)}>
                <Modal.Title>
                    Add New Customer
                </Modal.Title>
                <Modal.Content>
                    <div>
                        <CustomerForm/>
                    </div>
                </Modal.Content>
            </Modal>
            </div>
            
        </Layout>
    );
};

export default Customers;