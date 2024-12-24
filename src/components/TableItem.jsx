import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';
import SelectForm from './Select';
import HandleStatus from '../utils/HandleStatus';

const TableItem = ({ rows, labels, onStatusChange, onRowClick }) => {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              {labels.map((label, index) => (
                <TableCell key={index} align={index === 0 ? 'left' : 'right'}>
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {row.map(
                  (cell, cellIndex) =>
                    cell.label !== 'id' && (
                      <TableCell
                        key={cellIndex}
                        align={cellIndex === 0 ? 'left' : 'right'}
                      >
                        {labels[cellIndex] === 'Статус' && onStatusChange ? (
                          <HandleStatus
                            cell={cell.value}
                            onChange={(newStatus) =>
                              onStatusChange(rows[rowIndex][0].value, newStatus)
                            }
                          />
                        ) : (
                          cell.value
                        )}
                      </TableCell>
                    )
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableItem;
