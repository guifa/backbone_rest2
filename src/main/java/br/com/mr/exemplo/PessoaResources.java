package br.com.mr.exemplo;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/pessoas")
public class PessoaResources {

	private static List<Pessoa> PESSOAS = new ArrayList<Pessoa>();//
	private static Integer idPessoas = 4;
	static {
		PESSOAS.add(new Pessoa(1, "1234567896", "Robson", "20/03/1970"));
		PESSOAS.add(new Pessoa(2, "2234567892", "Marcio", "29/10/1975"));
		PESSOAS.add(new Pessoa(3, "3234567896", "Silva", "23/07/1971"));
		PESSOAS.add(new Pessoa(4, "4234567896", "Penha", "10/08/1972"));
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response get() {
		return Response.ok().entity(PESSOAS).build();
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/search")
	public Response find(@QueryParam("dataNascimento") String dataNascimento, @QueryParam("cpf") String cpf, @QueryParam("nome") String nome) {
		System.out.println("PessoaResources.find()");
		Stream<Pessoa> pessoasStream = PESSOAS.stream();
		Pessoa pessoa = new Pessoa(cpf, nome, dataNascimento);
		if(pessoa.getId() != null && pessoa.getId() >= 0) {
			pessoasStream = pessoasStream.filter(p -> p.getId() == pessoa.getId());
		}
		if(pessoa.getDataNascimento() != null && !pessoa.getDataNascimento().equals("")) {
			pessoasStream = pessoasStream.filter(p -> Objects.equals(p.getDataNascimento(), pessoa.getDataNascimento()));
		}
		if(pessoa.getCpf() != null && !pessoa.getCpf().equals("")) {
			pessoasStream = pessoasStream.filter(p -> Objects.equals(p.getCpf(), pessoa.getCpf()));
		}
		if(pessoa.getNome() != null && !pessoa.getNome().equals("")) {
			pessoasStream = pessoasStream.filter(p -> Objects.equals(p.getNome(), pessoa.getNome()));
		}
		List<Pessoa> result = pessoasStream.collect(Collectors.toList());
		System.out.println("Size: " + result.size());
		System.out.println(result.get(0).toString());
		return Response.ok().entity(result).build();
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response salva(Pessoa pessoa) {
		pessoa.setId(++idPessoas);
		PESSOAS.add(pessoa);
		return Response.ok().entity(pessoa).build();
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("{id}")
	public Response get(@PathParam("id") Integer id) {
		for (Pessoa p : PESSOAS) {
			if (p.getId().equals(id)) {
				return Response.ok().entity(p).build();
			}
		}
		return Response.noContent().build();
	}

	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("{id}")
	public Response update(@PathParam("id") Integer id, Pessoa pessoa) {

		for (Pessoa p : PESSOAS) {
			if (p.getId().equals(id)) {
				p.setNome(pessoa.getNome());
				p.setDataNascimento(pessoa.getDataNascimento());
				p.setCpf(pessoa.getCpf());
				return Response.ok().entity(p).build();
			}
		}
		return null;
	}

	@DELETE
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("{id}")
	public Response delete(@PathParam("id") Integer id) {

		Pessoa toRemove = null;
		for (Pessoa p : PESSOAS) {
			if (p.getId().equals(id)) {
				toRemove = p;
				break;
			}
		}
		boolean remove = PESSOAS.remove(toRemove);
		return Response.ok().entity(remove).build();

	}
}
