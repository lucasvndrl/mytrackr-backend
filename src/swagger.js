const swaggerOptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "MyTrackrAPI",
      version: "0.1.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      schemas: {
        Account: {
          type: "object",
          require: [
            "user_id",
            "username",
            "email",
            "created_at",
            "last_login",
            "favorite_genres",
          ],
          properties: {
            user_id: {
              type: "string",
              description: "Sub from auth0 login",
            },
            username: {
              type: "string",
            },
            email: {
              type: "string",
            },
            created_at: {
              type: "string",
              format: "date-time",
            },
            last_login: {
              type: "string",
              format: "date-time",
            },
            favorite_genres: {
              type: "array",
              items: {
                type: "string",
              },
            },
            avatar: {
              type: "string",
              format: "binary",
            },
          },
        },
        Review: {
          type: "object",
          require: [
            "review_id",
            "movie_id",
            "review_text",
            "reviewer",
            "rating",
          ],
          properties: {
            review_id: {
              type: "string",
            },
            movie_id: {
              type: "string",
            },
            review_text: {
              type: "string",
            },
            reviewer: {
              type: "string",
            },
            rating: {
              type: "number",
            },
          },
        },
        Movie: {
          type: "object",
          require: [
            "movie_id",
            "title",
            "synopsis",
            "directed_by",
            "duration",
            "rating",
          ],
          properties: {
            movie_id: {
              type: "string",
            },
            title: {
              type: "string",
            },
            synopsis: {
              type: "string",
            },
            directed_by: {
              type: "string",
            },
            duration: {
              type: "number",
            },
            rating: {
              type: "number",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/**.ts"],
};

export default swaggerOptions;
