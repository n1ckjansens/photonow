interface HttpResponse<T> extends Response {
	parsedBody?: T
}

export default async function request<T>(
	url: string,
	method = 'GET',
	body = null,
	headers = {}
): Promise<HttpResponse<T>> {
	// making request to server
	const response: HttpResponse<T> = await fetch(url, { method, body, headers })

	try {
		// may error if there is no body
		// parsing response to json
		response.parsedBody = await response.json()
	} catch (e) {
		throw new Error(`Error parsing response: empty body`)
	}

	// if any errors found - throwing new error
	if (!response.ok) {
		throw new Error(`Error: status ${response.statusText}`)
	}

	// retutning response
	return response
}
