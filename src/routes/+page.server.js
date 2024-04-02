export function load() {
    return {
        tweets: [
            {
                id: 1,
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                user: {
                    id: 1,
                    name: "John Doe"
                },
                creationTime: "2g"
            },
            {
                id: 2,
                text: "some text",
                user: {
                    id: 2,
                    name: "Mary Doe"
                },
                creationTime: "3g"
            }
        ]
    };
}
