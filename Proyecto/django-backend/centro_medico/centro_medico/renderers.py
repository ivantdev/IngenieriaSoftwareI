from rest_framework.renderers import JSONRenderer


class CustomJSONRenderer(JSONRenderer):
    """
    Render the response in JSON format with a custom structure:
    - In successful responses (status < 400):
        {"status": "success", "data": <data>}
    - In error responses (status >= 400):
        {"status": "error", "message": <message>}
    """

    def render(self, data, accepted_media_type=None, renderer_context=None):
        response = renderer_context.get("response", None)

        if response is None:
            return super().render(data, accepted_media_type, renderer_context)

        status_code = response.status_code

        if status_code >= 400:
            message = None
            if isinstance(data, dict):
                message = data.get("detail", data)
            else:
                message = data
            custom_response = {"status": "error", "message": message}
        else:
            custom_response = {"status": "success", "data": data}

        return super().render(custom_response, accepted_media_type, renderer_context)
