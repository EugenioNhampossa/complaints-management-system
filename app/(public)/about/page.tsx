"use client";

import { 
  Box, 
  Container, 
  Title, 
  Text, 
  Grid, 
  Card, 
  Group, 
  ThemeIcon,
  Stack,
  Timeline,
  Button,
  Image,
  Paper,
  SimpleGrid
} from "@mantine/core";
import { 
  IconTarget, 
  IconEye, 
  IconUsers, 
  IconShieldCheck, 
  IconBolt,
  IconFileDescription,
  IconUserCheck,
  IconCircleCheck,
  IconMail,
  IconPhone,
  IconMapPin
} from "@tabler/icons-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <section className="bg-white dark:bg-stone-900 min-h-screen">
      <Container size="xl" className="px-6 py-12">
        {/* Logo Section */}
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
            Sobre Nós
          </Title>
          <Text 
            size="lg" 
            className="text-stone-600 dark:text-stone-400 max-w-3xl mx-auto"
          >
            Comprometidos em criar uma plataforma transparente e eficiente para 
            denúncias e reclamações, contribuindo para uma comunidade melhor
          </Text>
        </Box>

        {/* Missão e Visão */}
        <Grid gutter="lg" className="mb-16">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card 
              shadow="sm" 
              padding="lg" 
              radius="md" 
              className="h-full border border-stone-200 dark:border-stone-700"
            >
              <Group mb="md">
                <ThemeIcon size="xl" variant="light" color="blue">
                  <IconTarget size={28} />
                </ThemeIcon>
                <Title order={3} className="text-stone-800 dark:text-white">
                  Nossa Missão
                </Title>
              </Group>
              <Text className="text-stone-600 dark:text-stone-400">
                Facilitar a comunicação entre cidadãos e autoridades, permitindo 
                que problemas sejam reportados de forma rápida e eficiente. 
                Acreditamos que através da transparência e colaboração, podemos 
                construir uma sociedade mais organizada.
              </Text>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card 
              shadow="sm" 
              padding="lg" 
              radius="md"
              className="h-full border border-stone-200 dark:border-stone-700"
            >
              <Group mb="md">
                <ThemeIcon size="xl" variant="light" color="green">
                  <IconEye size={28} />
                </ThemeIcon>
                <Title order={3} className="text-stone-800 dark:text-white">
                  Nossa Visão
                </Title>
              </Group>
              <Text className="text-stone-600 dark:text-stone-400">
                Ser a principal plataforma de denúncias e reclamações em Mocambique, 
                reconhecida pela transparência, eficiência e impacto positivo na 
                resolução de problemas comunitários, promovendo a participação 
                cidadã ativa.
              </Text>
            </Card>
          </Grid.Col>
        </Grid>

        {/* Valores */}
        <Box className="mb-16">
          <Title 
            order={2} 
            className="text-3xl font-semibold text-center text-stone-800 dark:text-white mb-10"
          >
            Nossos Valores
          </Title>
          
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
            <Paper 
              p="lg" 
              className="text-center hover:shadow-lg transition-shadow border border-stone-200 dark:border-stone-700"
            >
              <ThemeIcon size={60} variant="light" color="blue" className="mx-auto mb-4">
                <IconShieldCheck size={30} />
              </ThemeIcon>
              <Title order={4} className="mb-2 text-stone-800 dark:text-white">
                Transparência
              </Title>
              <Text size="sm" className="text-stone-600 dark:text-stone-400">
                Acreditamos na importância da transparência em todos os processos 
                e na prestação de contas à comunidade
              </Text>
            </Paper>

            <Paper 
              p="lg" 
              className="text-center hover:shadow-lg transition-shadow border border-stone-200 dark:border-stone-700"
            >
              <ThemeIcon size={60} variant="light" color="green" className="mx-auto mb-4">
                <IconUsers size={30} />
              </ThemeIcon>
              <Title order={4} className="mb-2 text-stone-800 dark:text-white">
                Sei La
              </Title>
              <Text size="sm" className="text-stone-600 dark:text-stone-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, eaque minima illum, nisi, odit ex praesentium aspernatur eius velit nam alias quae obcaecati impedit laborum at nobis sequi cum sapiente?
              </Text>
            </Paper>

            <Paper 
              p="lg" 
              className="text-center hover:shadow-lg transition-shadow border border-stone-200 dark:border-stone-700"
            >
              <ThemeIcon size={60} variant="light" color="orange" className="mx-auto mb-4">
                <IconBolt size={30} />
              </ThemeIcon>
              <Title order={4} className="mb-2 text-stone-800 dark:text-white">
                Eficiência
              </Title>
              <Text size="sm" className="text-stone-600 dark:text-stone-400">
                Respostas rápidas e soluções eficazes para os problemas 
                reportados pela comunidade
              </Text>
            </Paper>
          </SimpleGrid>
        </Box>

        {/* Como Funciona */}
        <Card 
          className="mb-16 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700" 
          padding="xl"
        >
          <Title 
            order={2} 
            className="text-3xl font-semibold text-center text-stone-800 dark:text-white mb-10"
          >
            Como Funciona
          </Title>

          <Timeline active={3} bulletSize={40} lineWidth={2} className="max-w-2xl mx-auto">
            <Timeline.Item
              bullet={<IconFileDescription size={20} />}
              title={
                <Text className="font-semibold text-stone-800 dark:text-white">
                  Registe a sua denúncia
                </Text>
              }
            >
              <Text size="sm" className="text-stone-600 dark:text-stone-400">
                Descreva detalhadamente o problema, adicione a localização exata 
                e anexe fotos ou vídeos se necessário
              </Text>
            </Timeline.Item>

            <Timeline.Item
              bullet={<IconUserCheck size={20} />}
              title={
                <Text className="font-semibold text-stone-800 dark:text-white">
                  Acompanhamento em tempo real
                </Text>
              }
            >
              <Text size="sm" className="text-stone-600 dark:text-stone-400">
                Receba notificações e atualizações sobre o estado da sua denúncia 
                através da plataforma
              </Text>
            </Timeline.Item>

            <Timeline.Item
              bullet={<IconCircleCheck size={20} />}
              title={
                <Text className="font-semibold text-stone-800 dark:text-white">
                  Resolução do problema
                </Text>
              }
            >
              <Text size="sm" className="text-stone-600 dark:text-stone-400">
                As autoridades competentes trabalham para resolver o problema 
                e você é notificado quando concluído
              </Text>
            </Timeline.Item>
          </Timeline>
        </Card>

        {/* Estatísticas */}
        <Box className="mb-16">
          <SimpleGrid cols={{ base: 2, md: 4 }} spacing="lg">
            <Paper className="text-center p-6 border border-stone-200 dark:border-stone-700">
              <Text className="text-3xl font-bold text-blue-600 mb-2">500+</Text>
              <Text size="sm" className="text-stone-600 dark:text-stone-400">
                Denúncias Registadas
              </Text>
            </Paper>
            <Paper className="text-center p-6 border border-stone-200 dark:border-stone-700">
              <Text className="text-3xl font-bold text-green-600 mb-2">350+</Text>
              <Text size="sm" className="text-stone-600 dark:text-stone-400">
                Casos Resolvidos
              </Text>
            </Paper>
            <Paper className="text-center p-6 border border-stone-200 dark:border-stone-700">
              <Text className="text-3xl font-bold text-orange-600 mb-2">1000+</Text>
              <Text size="sm" className="text-stone-600 dark:text-stone-400">
                Usuários Ativos
              </Text>
            </Paper>
            <Paper className="text-center p-6 border border-stone-200 dark:border-stone-700">
              <Text className="text-3xl font-bold text-purple-600 mb-2">24h</Text>
              <Text size="sm" className="text-stone-600 dark:text-stone-400">
                Tempo Médio de Resposta
              </Text>
            </Paper>
          </SimpleGrid>
        </Box>

        {/* Contacto */}
        <Card 
          shadow="lg" 
          padding="xl" 
          className="text-center border border-stone-200 dark:border-stone-700"
        >
          <Title 
            order={2} 
            className="text-3xl font-semibold text-stone-800 dark:text-white mb-4"
          >
            Entre em Contacto
          </Title>
          <Text className="text-stone-600 dark:text-stone-400 mb-8">
            Tem alguma dúvida ou sugestão? Estamos aqui para ajudar!
          </Text>
          
          <Group justify="center" gap="xl">
            <Stack align="center" gap="xs">
              <ThemeIcon size="lg" variant="light">
                <IconMail size={20} />
              </ThemeIcon>
              <div>
                <Text size="sm" weight={500} className="text-stone-800 dark:text-white">
                  Email
                </Text>
                <Text size="sm" className="text-stone-600 dark:text-stone-400">
                  suporte@denuncias.co.mz
                </Text>
              </div>
            </Stack>

            <Stack align="center" gap="xs">
              <ThemeIcon size="lg" variant="light">
                <IconPhone size={20} />
              </ThemeIcon>
              <div>
                <Text size="sm" weight={500} className="text-stone-800 dark:text-white">
                  Telefone
                </Text>
                <Text size="sm" className="text-stone-600 dark:text-stone-400">
                  +258 8x 123 45678
                </Text>
              </div>
            </Stack>

            <Stack align="center" gap="xs">
              <ThemeIcon size="lg" variant="light">
                <IconMapPin size={20} />
              </ThemeIcon>
              <div>
                <Text size="sm" weight={500} className="text-stone-800 dark:text-white">
                  Localização
                </Text>
                <Text size="sm" className="text-stone-600 dark:text-stone-400">
                  Maputo, Mocambique
                </Text>
              </div>
            </Stack>
          </Group>

          <Group justify="center" mt="xl" gap="md">
            <Button variant="outline" component={Link} href="/" size="lg">
              Voltar ao Início
            </Button>
            <Button component={Link} href="/complaints/add" size="lg">
              Fazer uma Denúncia
            </Button>
          </Group>
        </Card>
      </Container>
    </section>
  );
}