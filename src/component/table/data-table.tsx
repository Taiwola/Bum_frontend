import { useModal } from "@/providers/model-provider-file";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import {ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, useReactTable} from "@tanstack/react-table";
import { Search } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import CustomModel from "@/global/custom-model";

interface DataTableProp<Tdata, Tvalue> {
    columns: ColumnDef<Tdata, Tvalue>[]
    data: Tdata[]
    filterValue: string
    actionButtonText?: React.ReactNode
    modalChildren?: React.ReactNode
}

export default function DataTable<Tdata, Tvalue>({columns, data, filterValue, actionButtonText, modalChildren}: DataTableProp<Tdata, Tvalue>) {

    const {setOpen} = useModal();

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel:getCoreRowModel(),
        getFilteredRowModel:getFilteredRowModel()
    })
  return (
    <div className="flex flex-col items-center justify-between">
        <div className="flex self-end items-center py-4 gap-2">
            <Search />
            <Input type="search" placeholder="search name" value={table.getColumn(filterValue)?.getFilterValue() as string ?? ""} 
            onChange={(event) => {
                table.getColumn(filterValue)?.setFilterValue(event.target.value)
            }}
            className="h-12"
            />
            <Button className="flex gap-2" onClick={() => {
                if (modalChildren) {
                    setOpen(
                        <CustomModel
                          title="Add a team member"
                          subheading="Send an invitation"
                        >
                          {modalChildren}
                        </CustomModel>
                    )
                }
            }}>{actionButtonText}</Button>
        </div>
        <div className="border bg-background rounded-lg">
            <Table>
            <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? table.getRowModel().rows.map((row) => <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} >
                {row.getVisibleCells().map((cell) => <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>)}
            </TableRow>) : (
                <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                        No Result
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
            </Table>
        </div>
    </div>
  )
}