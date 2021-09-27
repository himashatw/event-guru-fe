import React, { Fragment } from "react";
import {
  useTable,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
} from "react-table";
import { Table, Row, Col, Button, Input, CustomInput } from "reactstrap";
import { Filter, DefaultColumnFilter } from "./filter";

const TableContainer = ({ columns, data, renderRowSubComponent }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    visibleColumns,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
  );

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";
  };

  const onChangeInSelect = (event) => {
    setPageSize(Number(event.target.value));
  };

  const onChangeInInput = (event) => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    gotoPage(page);
  };

  return (
    <Fragment>
      <div>
        <table
          className="table"
          style={{
            padding: 10,
            borderWidth: 5,
            alignItems: "center",
            borderCollapse: "collapse",
            margin: "25px 0",
            fontSize: "0.9rem",
            fontFamily: "sans-serif",
            boxShadow: "0 0 20px rgba(0, 0, 0, 0.15)",
            width: "100%",
          }}
          bordered
          hover
          {...getTableProps()}
        >
          <thead
            className="thead-dark"
            style={{
              backgroundColor: "#009878",
              color: "#ffffff",
              fontSize: 20,
            }}
          >
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    scope="col"
                    style={{ padding: "12px 15px" }}
                  >
                    <div {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                      {generateSortingIndicator(column)}
                    </div>
                    <Filter column={column} />
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <Fragment key={row.getRowProps().key}>
                  <tr
                    style={{
                      borderBottom: "3px solid #dddddd",
                      fontWeight: "bold",
                      color: "#00000",
                      fontSize: 18,
                    }}
                  >
                    {row.cells.map((cell) => {
                      return (
                        <td
                          style={{
                            border: "1px solid gray",
                            padding: "12px 15px",
                          }}
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                  {row.isExpanded && (
                    <tr>
                      <td colSpan={visibleColumns.length}>
                        {renderRowSubComponent(row)}
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>

        <Row
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            textAlign: "center",
            display: "flex",
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-evenly",
            alignItems: "baseline",
            fontSize: 19,
          }}
        >
          <Col md={3}>
            <Button
              color="primary"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
              style={{ fontWeight: "bold", fontSize: 20, marginRight: 30 }}
            >
              {"<<"}
            </Button>
            <Button
              color="primary"
              onClick={previousPage}
              disabled={!canPreviousPage}
            >
              {"<"}
            </Button>
          </Col>
          <Col md={2} style={{ marginTop: 7 }}>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </Col>
          <Col md={2}>
            <Input
              type="number"
              min={1}
              style={{ width: 70, border: "1px solid gray", color: "black" }}
              max={pageOptions.length}
              defaultValue={pageIndex + 1}
              onChange={onChangeInInput}
            />
          </Col>
          <Col md={2}>
            <CustomInput
              type="select"
              value={pageSize}
              onChange={onChangeInSelect}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </CustomInput>
          </Col>
          <Col md={3}>
            <Button color="primary" onClick={nextPage} disabled={!canNextPage}>
              {">"}
            </Button>
            <Button
              color="primary"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
              style={{ fontWeight: "bold", fontSize: 20, marginLeft: 30 }}
            >
              {">>"}
            </Button>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default TableContainer;
