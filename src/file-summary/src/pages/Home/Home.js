import * as S from './Styled'
import React, { useRef } from 'react';
import {  TablePagination, Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { IconButton } from '@mui/material';
import RecyclingIcon from '@mui/icons-material/Recycling';

const columns = [
  { 
    id: 'id',
    label: 'Id',
    minWidth: 2,
    align: 'center'},
  { 
    id: 'workItem',
    label: 'Work Item',
    minWidth: 2 ,
    align: 'center'
  },
  { 
    id: 'title',
    label: 'Titulo',
    minWidth: 2 ,
    align: 'center'
  },
  {
    id: 'name',
    label: 'Nome',
    minWidth: 10,
    align: 'center'
  },
  {
    id: 'situation',
    label: 'Situação',
    minWidth: 2,
    align: 'center'
  },
  {
    id: 'completeHour',
    label: 'Realizado',
    minWidth: 2,
    align: 'center'
  },
  {
    id: 'estimateHour',
    label: 'Estimado',
    minWidth: 2,
    align: 'center'
  },
  {
    id: 'team',
    label: 'Time',
    minWidth: 2,
    align: 'center'
  },
];

//Incio da Funcao Home !!
function Home() {
  const fileInputRef = useRef(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [entities, setEntities] = React.useState([]);

  function createEntity (line) {
    const [ID, WorkItemType, Title, AssignedTo, State, CompletedWork, OriginalEstimate, IterationPath] = line.split(',');
    const entity = {
      id: ID.replace(/"/g, ''),
      workItem: WorkItemType.replace(/"/g, ''),
      title: Title.replace(/"/g, ''),
      name: AssignedTo.replace(/"/g, ''),
      situation: State.replace(/"/g, ''),
      completeHour: CompletedWork.replace(/"/g, ''),
      estimateHour: OriginalEstimate.replace(/"/g, ''),
      team: IterationPath.replace(/"/g, ''),
    };
  
    return entity;
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];    

    if (file) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const fileContent = e.target.result;
      
        const lines = fileContent.split('\n');
        var entities = lines.slice(1).map(createEntity);

        setEntities([...entities]);
      };
      
      reader.readAsText(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleButtonClean = () => {
    setEntities([]);
  }

    return (
      <S.Container>
        <div>
          <div>
            <S.Title>
              <IconButton >
                <PictureAsPdfIcon sx={{ fontSize: 35, color:'#fff' }}/>
              </IconButton>
              FILE SUMMARY
            </S.Title>
          </div>
          

          <S.DivImport>
            <Stack direction="row">

            <input
              ref={fileInputRef}
              type="file"
              style={{ display: 'none' }}
              onChange={handleFileInputChange}
            />
            <Button 
              variant="contained"
              onClick={handleButtonClick}
              startIcon={<FileUploadOutlinedIcon />}>
              Importar
            </Button>

            <Button 
             color='success'
              variant="contained"
              onClick={handleButtonClean}
              startIcon={<RecyclingIcon />}
              sx={{ marginLeft: '10px'}} >
              Limpar
            </Button>

            </Stack>
          </S.DivImport>
          
          <div>
            <Paper elevation={20} sx={{ padding: '1rem', margin: '10rem', borderRadius: '20px'}}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {entities
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                            {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === 'number'
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={entities.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>

            
        </div>
      </S.Container>
    );
  };

export default Home;