FROM rabbitmq:3.9
COPY ./rabbitmq_delayed_message_exchange-3.9.0.ez /plugins
RUN rabbitmq-plugins enable --offline rabbitmq_mqtt rabbitmq_federation_management rabbitmq_stomp rabbitmq_delayed_message_exchange