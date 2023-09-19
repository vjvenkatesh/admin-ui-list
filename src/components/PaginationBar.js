import React from 'react'
import '../styles/PaginationBar.css';


function PaginationBar({ handleDeleteSelected, filteredUsers, setCurrentPage, currentPage, selectedRows, selectAll }) {


    const firstPageLabel = '<<';
    const prevPageLabel = '<';
    const nextPageLabel = '>';
    const lastPageLabel = '>>';

    const handlePageChange = (value) => {
        setCurrentPage(value);
    }

    

    // Handle pagination
    const itemsPerPage = 10;
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    return (
        <div className='pagination-row'>
            <div className='delete-buttton-section'>
                {selectedRows.length > 0 || selectAll ? (
                    <button className='delete-btn' onClick={handleDeleteSelected}>Delete Selected</button>
                ) : null}
            </div>


            <div className='page-section'>
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(1)}
                    className='page-btn'
                >
                    {firstPageLabel}
                </button>
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className='page-btn'
                >
                    {prevPageLabel}
                </button>




                {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`page-btn ${index + 1 === currentPage ? 'active' : ''}`}

                    >
                        {index + 1}

                    </button>

                ))}




                <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className='page-btn'
                >
                    {nextPageLabel}
                </button>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(totalPages)}
                    className='page-btn'
                >
                    {lastPageLabel}
                </button>



            </div>
        </div>
    )
}

export default PaginationBar



