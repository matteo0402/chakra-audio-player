import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Tfoot,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import QueueItem from './QueueItem'
import { Songs } from '../types/audio'

function Queue() {

  return (
    <TableContainer>
      <Table variant='simple'>
        <TableCaption>Audio queue</TableCaption>
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Title</Th>
            <Th>Artist</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Songs.map((song, index) => (
            <QueueItem audio={song} key={index}/>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>#</Th>
            <Th>Title</Th>
            <Th>Artist</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  )


}

export default Queue