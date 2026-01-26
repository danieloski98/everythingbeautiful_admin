"use client";

import { paginationLimit } from "@/helper/utils/databank";
import { dateFormat } from "@/helper/utils/dateFormat";
import { formatNumber } from "@/helper/utils/numberFormat";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue,
    Spinner,
    Pagination,
} from "@heroui/react";
import CustomSelect from "./customSelect"; 
import { Column } from "@/helper/model/table";


interface CustomTableProps<T extends { key: string }> {
    columns: Column<T>[];
    rows: T[];
    isLoading?: boolean;
    emptyText?: string;
    total: number;
    page: number;
    setPage: (by: number) => void;
    limit: string;
    setLimit: (by: string) => void;
}

export default function CustomTable<T extends { key: string }>({
    columns,
    rows,
    isLoading = false,
    emptyText = "No data available",
    page,
    total,
    setPage,
    limit,
    setLimit
}: CustomTableProps<T>) {

    const currentTotal = Math.ceil(Number(total) / Number(limit))

    return (
        <div>

            <Table aria-label="Reusable table">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.key}>
                            <p className=" uppercase ">
                                {column.label}
                            </p>
                        </TableColumn>
                    )}
                </TableHeader>

                <TableBody
                    items={rows}
                    isLoading={isLoading}
                    emptyContent={emptyText}
                    loadingContent={<Spinner label="Loading..." />}
                >
                    {(item) => (
                        <TableRow key={item.key} >
                            {columns.map((column) => {

                                const value = column?.type === "custom" ? item : column.key ? getKeyValue(item, column.key) : item

                                // 👇 Full custom render
                                if (column.render) {
                                    return (
                                        <TableCell key={column.key}>
                                            <div className=" h-[50px] flex items-center" >
                                                {column.render(value)}
                                            </div>
                                        </TableCell>
                                    );
                                }
                                
                                // 👇 Date formatting
                                if (column.type === "date" && value) {

                                    return (
                                        <TableCell key={column.key}>
                                            <div className=" w-fit rounded-full py-1 px-3 border-[#DDE6EB] border " >
                                                {dateFormat(value)}
                                            </div>
                                        </TableCell>
                                    );
                                }

                                if (column.type === "number") {
                                    return (
                                        <TableCell key={column.key}>
                                            <div className=" w-fit rounded-full py-1 px-3 border-[#DDE6EB] border " >
                                                {formatNumber(Number(value), "")}
                                            </div>
                                        </TableCell>
                                    )
                                }

                                if (column.type === "currency") {
                                    return (
                                        <TableCell key={column.key}>
                                            <div className=" w-fit rounded-full py-1 px-3 border-[#DDE6EB] border " >
                                                {formatNumber(Number(value))}
                                            </div>
                                        </TableCell>
                                    )
                                }

                                // 👇 Default render
                                return (
                                    <TableCell key={column.key}>{value}</TableCell>
                                );
                            })}
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {currentTotal > 1 && (
                <div className=" w-full flex py-4 items-center gap-4 justify-between " >
                    <p className=" text-sm font-medium " >Total item: {total}</p>
                    <Pagination loop showControls initialPage={page} total={currentTotal}
                        onChange={setPage} />
                    <div className=" flex w-fit gap-2 items-center " >
                        <p className=" w-[100px] text-sm font-medium " >Show Per Page:</p>
                        <div className=" w-[100px] " >
                            <CustomSelect name="limit" notform options={paginationLimit} value={limit + ""} onchange={setLimit} ></CustomSelect>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
