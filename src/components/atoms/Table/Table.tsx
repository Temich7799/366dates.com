'use client'

import React from 'react';
import { Column, TableOptions, useTable, usePagination } from 'react-table';
import styles from './Table.module.scss';
import { Button } from '../Button/Button';

interface TableProps<Data extends object> {
    columns: Column<Data>[];
    data: Data[];
}

const Table = <Data extends object>({ columns, data }: TableProps<Data>) => {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        gotoPage,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageCount,
        state: { pageIndex },
    }: any = useTable<Data>(
        {
            columns,
            data,
            initialState: { pageIndex: 0 }, // начальное состояние страницы
        } as TableOptions<Data>,
        usePagination // использование пагинации
    );

    return (
        <>
            <table {...getTableProps()} className={styles.table}>
                <thead>
                    {headerGroups.map((headerGroup: any, index: number) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                            {headerGroup.headers.map((column: any) => (
                                <th{...column.getHeaderProps()} key={column.id}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row: any) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} key={row.id}>
                                {row.cells.map((cell: any, index: number) => (
                                    <td {...cell.getCellProps()} key={index}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className={styles.pagination}>
                <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </Button>{' '}
                <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </Button>{' '}
                <Button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </Button>{' '}
                <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </Button>{' '}
                <span>
                    <strong>
                        {pageIndex + 1} / {pageCount}
                    </strong>
                </span>
            </div>
        </>
    );
};

export default Table;
