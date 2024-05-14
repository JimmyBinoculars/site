import http.server
import socketserver
import os

class RequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Get the requested directory relative to the root
        requested_path = self.path
        
        # Print the requested path to the console
        print(f"Requested path: {requested_path}")

        if requested_path == "/":
            file_path = "index.html"
        else:
            file_path = requested_path.lstrip('/')

        try:
            if file_path.endswith('.html') or file_path.endswith('.css') or file_path.endswith('.js'):
                with open(file_path, 'r', encoding='utf-8') as file:
                    content = file.read()
                self.send_response(200)
                if file_path.endswith('.html'):
                    self.send_header("Content-type", "text/html")
                elif file_path.endswith('.css'):
                    self.send_header("Content-type", "text/css")
                elif file_path.endswith('.js'):
                    self.send_header("Content-type", "application/javascript")
                self.end_headers()
                self.wfile.write(content.encode('utf-8'))
            else:
                # Serve other files (images, etc.) using default handler
                super().do_GET()
        except FileNotFoundError:
            self.send_error(404, f"File not found: {file_path}")
        except UnicodeDecodeError:
            self.send_error(500, f"Unicode decode error: {file_path}")

PORT = 8000

with socketserver.TCPServer(("localhost", PORT), RequestHandler) as httpd:
    print(f"Serving on port {PORT}")
    httpd.serve_forever()
