import NextLink from 'next/link'
import { Link, VStack, Heading } from '@chakra-ui/layout'

const dashboard = () => {
    return (
        <VStack>
            <Heading as="h1">
               dashboard 
            </Heading>
            <NextLink href="/" passHref>
                <Link>
                    Go Home
                </Link>
            </NextLink>
        </VStack>
    )
}

export default dashboard
