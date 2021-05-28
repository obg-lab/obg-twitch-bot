import * as _ from 'lodash';
import cron from 'node-cron';
import { say } from '../../components/chatClient.js';

// # ┌────────────── second (optional)
// # │ ┌──────────── minute
// # │ │ ┌────────── hour
// # │ │ │ ┌──────── day of month
// # │ │ │ │ ┌────── month
// # │ │ │ │ │ ┌──── day of week
// # │ │ │ │ │ │
// # │ │ │ │ │ │
// # * * * * * *

export const start = () => {
  const messages = [
    "DON'T PANIC!",
    "Não entre em pânico!",
    'Ah, a vida. Pode-se odiá-la ou ignorá-la, mas é impossível gostar dela.',
    'Não se preocupe. Não há perigo de eles se divertirem.',
    'Você acha que o seu problema é sério?',
    'Só ao tentar me colocar no seu nível intelectual, fico com dor de cabeça.',
    'Não tente me responder; sou 50 mil vezes mais inteligente que você e nem eu sei a resposta.',
    'Querem que eu fique sentado num canto criando ferrugem ou fique apodrecendo em pé mesmo?',
    'Gozado, justamente quando você pensa que a vida não pode ser pior, de repente ela piora ainda mais.',
    '... e, além disso, os meus diodos do lado esquerdo doem que é um horror...',
    'Olhe bem pra essa porta, ela vai abrir agora. Sabe como é que eu sei? Por causa do ar de autocomplacência insuportável que ela gera nessas ocasiões.',
    'Pra quê? Não vai adiantar mesmo. Nunca vale a pena se envolver.',
    'Pois é, com um cérebro do tamanho de um planete, eles me mandam buscar vocês e levar até a ponte de comando. Que tal isso como realização profissional?',
    'Vida? Não me falem de vida.',
    'É horrível. Tudo isso. Medonho. Melhor nem falar nisso.',
    'Você jura que não se incomoda?',
    'Não vou gostar de fazer isso.',
    'Por acaso eu estou baixando o astral de vocês? Porque eu não queria baixar o astral de vocês.',
    'Não vai dar certo.',
    'Acho que devo avisá-los de que estou muito deprimido.',
    'Não finja que você está com vontade de falar comigo. Eu sei que você me odeia.',
    'Faz parte da estrutura do Universo. É só eu falar com uma pessoa que na mesma hora ela me odeia. Até os robôs me odeiam. É só você me ignorar que eu provavelmente vou desaparecer do mapa.',
    'Eu estava muito entediado e deprimido, aí me liguei na entrada externa do computador. Conversei por muito tempo com ele e expliquei a minha concepção do Universo. ”E o que aconteceu?” ”Ele se suicidou.”',
    'Isso de nada adiantará, vamos todos morrer... se tivermos sorte!',
    'Só ao tentar me colocar no seu nível intelectual, fico com dor de cabeça.',
    'Gostaria de dizer que é um grande prazer, uma enorme honra e um privilégio para mim inaugurar esta ponte mas, já que não estou com meu chip de cinismo ligado, quero dizer que odeio e desprezo todos vocês.',
  ];

  cron.schedule('0 */8 * * * *', () => {
    const index = _.random(message.length - 1);
    const message = message[index];

    say(messages[index]);
  });
};
