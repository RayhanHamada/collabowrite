import { Navbar } from '@/components/Navbar';
import { Button, Center, Container, Flex, Text } from '@chakra-ui/react';
import Head from 'next/head';
import {
  AiOutlineCloud,
  AiOutlineLink,
  AiOutlineUsergroupAdd,
} from 'react-icons/ai';

const whyReasons = [
  {
    reason: 'More Writer, More Ideas, More Works Get Done.',
    Icon: AiOutlineUsergroupAdd,
  },
  {
    reason: 'Keep Your Well-Written Articles In Our Secure Server.',
    Icon: AiOutlineCloud,
  },
  {
    reason: 'Easily Embed Article To Your Own Website.',
    Icon: AiOutlineLink,
  },
];

export default function LandingPage() {
  return (
    <div>
      <Head>
        <title>CollaboWrite</title>
        <meta
          name="description"
          content="Collaborative Article editing with CollaboWrite"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Container
        maxW="full"
        // h="200vh"
        marginX="auto"
        bgColor="black"
        paddingTop="48"
      >
        {/* Intro Section */}
        <Text textAlign="center" fontSize="4xl" color="white">
          One Article, <b>More Writers.</b>
        </Text>
        <Text textAlign="center" paddingTop="8" fontSize="lg" color="white">
          CollaboWrite enables you and your awesome team to make great articles
          and embed them in your own website.
        </Text>
        <Center paddingTop="16">
          <Button alignSelf="center" size="lg" _hover={{ opacity: 0.7 }}>
            Getting Started
          </Button>
        </Center>

        {/* Why Section */}
        <Text
          textAlign="center"
          paddingTop={{ base: '24', lg: '96' }}
          fontSize="3xl"
          textDecor="underline"
          color="white"
        >
          Why Us ?
        </Text>
        <Flex paddingY="16" alignItems="center" justifyContent="center">
          {whyReasons.map(({ reason, Icon }, idx) => (
            <Flex
              key={idx}
              marginX="4"
              w="12em"
              flexDir="column"
              alignItems="center"
            >
              <Icon color="white" size="4em" />
              <Text
                textAlign="center"
                paddingTop="8"
                fontSize="md"
                color="white"
                flexWrap="wrap"
              >
                {reason}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Container>
    </div>
  );
}
