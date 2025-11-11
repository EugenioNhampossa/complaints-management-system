"use client";

import {
  Box,
  Container,
  Title,
  Text,
  Accordion,
  Card,
  Button,
  Group,
  Image,
  Stack,
  ThemeIcon,
  Paper,
} from "@mantine/core";
import {
  IconQuestionMark,
  IconFileText,
  IconUserPlus,
  IconAlertCircle,
  IconMessage,
  IconSettings,
} from "@tabler/icons-react";
import Link from "next/link";

const faqs = [
  {
    value: "como-registar",
    question: "Como faço para registar uma denúncia?",
    answer:
      "Para registar uma denúncia, clique no botão 'Nova Denúncia' na página inicial ou na página de reclamações. Preencha o formulário com todos os detalhes relevantes, incluindo localização e fotos se disponíveis.",
  },
  {
    value: "tempo-resposta",
    question: "Quanto tempo demora para receber uma resposta?",
    answer:
      "O tempo médio de resposta inicial é de 24 a 48 horas. No entanto, a resolução completa pode variar dependendo da complexidade do problema reportado.",
  },
    {
    value: "acompanhar",
    question: "Como posso acompanhar o estado da minha denúncia?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    value: "tipos",
    question: "Que tipos de problemas posso denunciar?",
    answer:
      "Você pode denunciar diversos problemas como: iluminação pública, buracos nas estradas, lixo acumulado, vazamentos de água, poluição sonora, entre outros problemas que afetam a comunidade.",
  },
];

export default function HelpPage() {
  return (
    <section className="bg-white dark:bg-stone-900 min-h-screen">
      <Container size="xl" className="px-6 py-12">
        {/* Logo */}
        <Box className="text-center mb-12">
          <Image
            src="/logo-full.svg"
            alt="Logo"
            className="h-[50px] w-fit object-contain mx-auto mb-8"
          />
        </Box>

        {/* Hero Section */}
        <Box className="text-center mb-16">
          <Title
            order={1}
            className="text-4xl md:text-5xl font-bold text-stone-800 dark:text-white mb-4"
          >
            Central de Ajuda
          </Title>
          <Text
            size="lg"
            className="text-stone-600 dark:text-stone-400 max-w-3xl mx-auto"
          >
            Encontre respostas para suas dúvidas e aprenda a usar nossa plataforma
          </Text>
        </Box>

        {/* Quick Links */}
        <Box className="mb-16">
          <Title
            order={2}
            className="text-2xl font-semibold text-stone-800 dark:text-white mb-8 text-center"
          >
            Guias Rápidos
          </Title>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Paper
              p="lg"
              className="hover:shadow-lg transition-shadow cursor-pointer border border-stone-200 dark:border-stone-700"
            >
              <Group>
                <ThemeIcon size="lg" variant="light" color="blue">
                  <IconUserPlus size={20} />
                </ThemeIcon>
                <div>
                  <Text weight={500} className="text-stone-800 dark:text-white">
                    Como Registar-se
                  </Text>
                  <Text size="sm" className="text-stone-600 dark:text-stone-400">
                    Crie sua conta em minutos
                  </Text>
                </div>
              </Group>
            </Paper>

            <Paper
              p="lg"
              className="hover:shadow-lg transition-shadow cursor-pointer border border-stone-200 dark:border-stone-700"
            >
              <Group>
                <ThemeIcon size="lg" variant="light" color="green">
                  <IconFileText size={20} />
                </ThemeIcon>
                <div>
                  <Text weight={500} className="text-stone-800 dark:text-white">
                    Fazer Denúncia
                  </Text>
                  <Text size="sm" className="text-stone-600 dark:text-stone-400">
                    Passo a passo completo
                  </Text>
                </div>
              </Group>
            </Paper>

            <Paper
              p="lg"
              className="hover:shadow-lg transition-shadow cursor-pointer border border-stone-200 dark:border-stone-700"
            >
              <Group>
                <ThemeIcon size="lg" variant="light" color="orange">
                  <IconMessage size={20} />
                </ThemeIcon>
                <div>
                  <Text weight={500} className="text-stone-800 dark:text-white">
                    Adicionar Comentários
                  </Text>
                  <Text size="sm" className="text-stone-600 dark:text-stone-400">
                    Interaja com a comunidade
                  </Text>
                </div>
              </Group>
            </Paper>
          </div>
        </Box>

        {/* FAQs */}
        <Card className="mb-16 border border-stone-200 dark:border-stone-700">
          <Title
            order={2}
            className="text-2xl font-semibold text-stone-800 dark:text-white mb-8"
          >
            Perguntas Frequentes
          </Title>
          <Accordion>
            {faqs.map((faq) => (
              <Accordion.Item key={faq.value} value={faq.value}>
                <Accordion.Control>
                  <Text className="text-stone-800 dark:text-white">
                    {faq.question}
                  </Text>
                </Accordion.Control>
                <Accordion.Panel>
                  <Text className="text-stone-600 dark:text-stone-400">
                    {faq.answer}
                  </Text>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </Card>

        {/* Contact Support */}
        <Card
          className="text-center border border-stone-200 dark:border-stone-700"
          padding="xl"
        >
          <ThemeIcon
            size={60}
            variant="light"
            color="blue"
            className="mx-auto mb-4"
          >
            <IconQuestionMark size={30} />
          </ThemeIcon>
          <Title
            order={3}
            className="text-xl font-semibold text-stone-800 dark:text-white mb-4"
          >
            Ainda tem dúvidas?
          </Title>
          <Text className="text-stone-600 dark:text-stone-400 mb-6">
            Nossa equipa de suporte está pronta para ajudar
          </Text>
          <Group justify="center" gap="md">
            <Button variant="outline" component={Link} href="/about">
              Contacte-nos
            </Button>
            <Button component={Link} href="/complaints/add">
              Fazer Denúncia
            </Button>
          </Group>
        </Card>
      </Container>
    </section>
  );
}