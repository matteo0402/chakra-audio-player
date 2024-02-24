import {
  Center,
  Kbd,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import QueueItem from './QueueItem'
import { Songs } from '../../types/audio'

function Queue() {

  return (
    <TableContainer>
      <Table variant="simple">
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
        <TableCaption>
          <Center flexDirection={'column'} gap={2}>
            <Stack direction={'row'}>
              <Kbd>space</Kbd>
              <Text>
                to toggle play/pause
              </Text>
            </Stack>
            <Stack direction={'row'}>
              <Kbd>m</Kbd>
              <Text>
                to mute/unmute
              </Text>
            </Stack>
            <Stack direction={'row'}>
              <Kbd>l</Kbd>
              <Text>
                to toggle loop
              </Text>
            </Stack>
            <Stack direction={'row'}>
              <Kbd>&#8592;</Kbd> <Text>&</Text> <Kbd>&#8594;</Kbd>
              <Text>
                to seek audio
              </Text>
            </Stack>
            <Stack direction={'row'}>
              <Kbd>&#8593;</Kbd> <Text>&</Text> <Kbd>&#8595;</Kbd>
              <Text>
                to adjust volume
              </Text>
            </Stack>
          </Center>
        </TableCaption>
      </Table>
    </TableContainer>
  )


}

export default Queue