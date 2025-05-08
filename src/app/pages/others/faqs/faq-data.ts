export interface Card {
    title: string,
    icon?: string,
    body: string
}

export interface Accordion {
    adClass?: string,
    cardAclass?: string,
    showIcon?: boolean,
    cards: Card[]
}

export interface AccordionGroup {
    title?: string,
    items: Accordion[]
}

const card1: Card = {
    title: 'Cum va fi livrat coletul meu?',
    body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus. Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi. '
}

const card2: Card = {
    title: 'Cum plătesc pentru livrare?',
    body: 'Ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. '
}

const card3: Card = {
    title: 'Voi plăti pentru garanție?',
    body: 'Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. '
}

const card4: Card = {
    title: 'Produsul a ajuns cu daune',
    body: 'Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. '
}

const card5: Card = {
    title: 'Urmărirea comenzii',
    body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.'
}

const card6: Card = {
    title: 'Nu am primit comanda',
    body: 'Ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. '
}

const card7: Card = {
    title: 'Cum pot returna un produs?',
    body: 'Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. '
}

const card8: Card = {
    title: 'Ce metode de plată pot folosi?',
    body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.'
}

const card9: Card = {
    title: 'Pot plăti cu card cadou?',
    body: 'Ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. '
}

const card10: Card = {
    title: "Nu pot efectua o plată",
    body: 'Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. '
}

const card11: Card = {
    title: "Am făcut plata pentru produs?",
    body: 'Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. '
}

const faq1: Accordion = {
    adClass: 'accordion-rounded',
    cardAclass: "card-box card-sm bg-light",
    cards: [
        card1, card2, card3, card4
    ]
}

const faq2: Accordion = {
    adClass: 'accordion-rounded',
    cardAclass: "card-box card-sm bg-light",
    cards: [
        card5, card6, card7
    ]
}

const faq3: Accordion = {
    adClass: 'accordion-rounded',
    cardAclass: "card-box card-sm bg-light",
    cards: [
        card8, card9, card10, card11
    ]
}

export const faqGroups: AccordionGroup[] = [
    {
        title: 'Informații despre comandă',
        items: [
            faq1
        ]
    },
    {
        title: 'Comenzi și Retururi',
        items: [
            faq2
        ]
    },
    {
        title: 'Plăți',
        items: [
            faq3
        ]
    }
]