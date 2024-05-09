import Table from "../../atoms/Table/Table"
import { TFunction } from "i18next";

type UsersTableProps = {
    data: any[];
    t: TFunction<any, any>;
    exclude?: Array<string>;
    additionalColumns?: {
        Header: string;
        accessor: string;
    }[]
}

const UsersTable = ({ data, t, exclude, additionalColumns = [] }: UsersTableProps) => {

    const columns = [
        { Header: t('month'), accessor: 'month' },
        { Header: t('day'), accessor: 'day' },
        { Header: t('name'), accessor: 'name' },
        { Header: t('city'), accessor: 'city' },
        { Header: t('language'), accessor: 'language' },
        { Header: t('foreign'), accessor: 'foreign' },
        { Header: t('another_foreign'), accessor: 'another_foreign' },
        { Header: t('note'), accessor: 'note' },
        ...additionalColumns,
        { Header: 'ID', accessor: 'id' },
    ];

    const getFilteredColumns = () => columns.filter((column) => !exclude?.includes(column.accessor))

    return (
        <Table columns={exclude ? getFilteredColumns() : columns} data={data} />
    )
}

export default UsersTable;