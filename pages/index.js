import { useMemo, useRef, useState } from 'react'
import NextLink from 'next/link'
import Head from 'next/head'
import useSwr from 'swr'
import { Box, HStack, Link, Heading, VStack } from '@chakra-ui/layout'
import { Table, Tbody, TableCaption, Thead, Tr, Th, Td } from '@chakra-ui/table'
import { Skeleton } from '@chakra-ui/skeleton'
import { FormControl, FormLabel, FormHelperText } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Button } from '@chakra-ui/button'
import { Text } from '@chakra-ui/layout'
import { DeleteIcon } from '@chakra-ui/icons'
import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogBody } from '@chakra-ui/modal'
import { Spinner } from '@chakra-ui/spinner'


export default function Home() {
  const { 
    data: comments,
    error,
    isValidating,
    mutate,
    revalidate 
  } = useSwr('https://seo-beta.vercel.app/api/comments', (...args) => fetch(...args).then(res => res.json()))

  const [ text, setText ] = useState('')
  const [ status, setStatus ] = useState(false)
  const [ isOpen, setIsOpen ] = useState(false)
  const [ currentDeleteId, setDeleteId] = useState('')
  const cancelRef = useRef()
  
  const handleTextChange = ({ target: { value } }) => setText(value)
  
  const onClickDeleteButton = id => () => {
    setIsOpen(true)
    setDeleteId(id)
  }

  const onClose = () => setIsOpen(false)
  
  const onDeleteComment = () => {
    mutate(comments?.filter( ({ id }) => id !== currentDeleteId), false)
    onClose()
    fetch("https://seo-beta.vercel.app/api/comments", {
        method: 'DELETE',
        body: JSON.stringify({id: currentDeleteId})
      }).then(r => revalidate())
  }

  const handleCreateComment = () => {
    mutate([{ text: text, status: true}, ...comments ], false)
    if(text) {
      fetch("https://seo-beta.vercel.app/api/comments", {
        method: 'POST',
        body: JSON.stringify({text, status: true})
      }).then(r => r.json()).then( () => revalidate());
    }
  }

  return (
    <Box>
      <Head>          
        <title>Home</title>
      </Head>

      <HStack p={5} w="100%" h="10vh" bg="twitter.400" color="white">
        <Heading as="h4">
          <NextLink href={"/dashboard"} passHref>
            <Link>
              Dashboard
            </Link>
          </NextLink>
        </Heading>
      </HStack>
      <Text textAlign="center" h="20px" mt={4}>{isValidating && "Validating data..."}</Text>
      <Box >
        <VStack p={10}>
          <FormControl id="text">
            <FormLabel>Text</FormLabel>
            <Input value={text} onChange={handleTextChange} type="text" />
          </FormControl>
          <FormControl id="status">
            <FormLabel>Status</FormLabel>
            <Input type="text" />
            <FormHelperText>If status False no one can&apos;t see that comment</FormHelperText>
          </FormControl>
          <Button aria-label="create" onClick={handleCreateComment} type="submit" colorScheme="messenger">
            create
          </Button>
        </VStack>
      </Box>


      <Table variant="striped" mt={10} size="md">
          <TableCaption>All Comments</TableCaption>
          <Thead>
            <Tr>
              <Th isNumeric>id</Th>
              <Th>text</Th>
              <Th>estatus</Th>
            </Tr>
          </Thead>
          <Tbody>
            {!comments && !error ? 
              [1, 2, 3].map((index) => <Tr key={index}>
                  <Td>
                    <Skeleton colorScheme="gray">
                      Some text here
                    </Skeleton>
                  </Td>
                  <Td>
                    <Skeleton>
                      Some text here
                    </Skeleton>
                  </Td>
                  <Td>
                    <Skeleton>
                      Some text here
                    </Skeleton>
                  </Td>
                </Tr>
            ) : comments?.map(({ id, text, status}, index) => (
              <Tr key={id ? id : index} >
                <Td isNumeric>{id ? id :  <Spinner />}</Td>
                <Td>{text}</Td>
                <Td>
                  {id && status ? (
                    <Button aria-label="delete" onClick={onClickDeleteButton(id)} colorScheme="red">
                      <DeleteIcon w={5} h={5} color="red.100"/>
                    </Button>
                  ) : (
                    !status ? status.toString : <Spinner />
                  )}
                </Td>
              </Tr>
            ))}
           
          </Tbody>
      </Table>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Comment
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can&lsquo;t undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onDeleteComment} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  )
}